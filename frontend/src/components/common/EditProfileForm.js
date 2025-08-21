import { Upload, MapPin, FileText } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./EditProfileForm.module.css";
import Avatar from "./Avatar";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../../store/userSlice";
import API_URL from "../../config/api";

const EditProfileForm = ({ user, onCancel }) => {
  const dispatch = useDispatch();

  const initialValues = {
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.location || "",
    avatar: null, // ✅ store uploaded file
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name.trim()) {errors.name = "Name is required";}
    if (!values.bio.trim()) {
      errors.bio = "Bio is required";
    } else if (values.bio.length > 200) {
      errors.bio = "Bio must be less than 200 characters";
    }
    if (!values.location.trim()) {errors.location = "Location is required";}
    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // ✅ Use FormData instead of JSON
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("bio", values.bio);
      formData.append("location", values.location);

      if (values.avatar) {
        formData.append("avatar", values.avatar); // ✅ must match multer field name
      }

      const response = await fetch(`${API_URL}/api/users/${user._id}`, {
        method: "PUT",
        credentials: "include", // ✅ for cookies/auth
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        console.log("Profile updated successfully:", data.user);
        dispatch(setUserProfile(data.user));
        onCancel && onCancel();
      } else {
        console.error("Update failed:", data.error);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAvatarUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("avatar", file); // ✅ store file in Formik state
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFieldValue("avatarPreview", ev.target.result); // ✅ preview image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Formik
      initialValues={{ ...initialValues, avatarPreview: user?.avatarUrl || "" }}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ values, errors, isSubmitting, setFieldValue }) => (
        <Form className={styles.form}>
          {/* Avatar Section */}
          <div className={styles.avatarSection}>
            <Avatar
              url={values.avatarPreview || user?.avatarUrl}
              name={values.name}
              size={80}
            />
            <div className={styles.avatarUpload}>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                onChange={(e) => handleAvatarUpload(e, setFieldValue)}
                className={styles.fileInput}
              />
              <label htmlFor="avatar-upload" className={styles.uploadButton}>
                <Upload className="w-4 h-4" />
                Change Photo
              </label>
            </div>
          </div>

          {/* Name Field */}
          <div className={styles.formGroup}>
            <Field
              name="name"
              type="text"
              placeholder="Enter your name"
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
            />
            <ErrorMessage name="name" component="p" className={styles.errorText} />
          </div>

          {/* Bio Field */}
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <FileText className={styles.inputIcon} />
              <Field
                as="textarea"
                name="bio"
                placeholder="Tell us about yourself..."
                rows={3}
                maxLength={200}
                className={`${styles.textarea} ${errors.bio ? styles.inputError : ""}`}
              />
            </div>
            <div className={styles.bioFooter}>
              <ErrorMessage name="bio" component="p" className={styles.errorText} />
              <div className={styles.charCount}>{values.bio.length}/200</div>
            </div>
          </div>

          {/* Location Field */}
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <MapPin className={styles.inputIcon} />
              <Field
                name="location"
                type="text"
                placeholder="Enter your location"
                className={`${styles.input} ${errors.location ? styles.inputError : ""}`}
              />
            </div>
            <ErrorMessage name="location" component="p" className={styles.errorText} />
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.saveButton}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditProfileForm;
