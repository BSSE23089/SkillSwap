import { Form, useActionData, useNavigation, Link } from "react-router-dom";
import { useFormik } from "formik";
import { User, Mail, FileText, UserCheck } from "lucide-react";
import PasswordInput from "../common/PasswordInput";
import styles from "./Signup.module.css";

const BIO_MAX = 200;

const Signup = () => {
  const actionData = useActionData(); 
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      bio: "",
      role: "learner",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name.trim()) {
        errors.name = "Name is required";
      }
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.password || values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
      return errors;
    },
    onSubmit: () => {
      // Let React Router handle the real submit
    },
  });

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>SS</div>
          <h2 className={styles.title}>SkillSwap</h2>
          <p className={styles.subtitle}>Join our community and start your learning journey</p>
        </div>

        <Form
          method="post"
          className={styles.form}
          onSubmit={(e) => {
            const errors = formik.validateForm();
            errors.then((errObj) => {
              if (Object.keys(errObj).length > 0) {
                e.preventDefault();
                formik.setTouched({
                  name: true,
                  email: true,
                  password: true,
                  bio: true,
                  role: true,
                  confirmPassword: true,
                  terms: true,
                });
              }
            });
          }}
        >
          <div className={styles.field}>
            <label className={styles.label}>Full Name</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={20} />
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={styles.inputWithIcon}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className={styles.error}>{formik.errors.name}</p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={20} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={styles.inputWithIcon}
                autoComplete="email"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className={styles.error}>{formik.errors.email}</p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Short Bio</label>
            <div className={styles.inputWrapper}>
              <FileText className={styles.inputIcon} size={20} />
              <textarea
                name="bio"
                placeholder="Tell us about yourself..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bio}
                className={`${styles.inputWithIcon} ${styles.textarea}`}
                maxLength={BIO_MAX}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>I want to join as</label>
            <div className={styles.inputWrapper}>
              <UserCheck className={styles.inputIcon} size={20} />
              <select
                name="role"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                className={styles.inputWithIcon}
              >
                <option value="learner">Select your role</option>
                <option value="learner">Learner</option>
                <option value="teacher">Teacher</option>
                <option value="dual">Both</option>
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <PasswordInput
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Create a strong password"
              wrapperClass={styles.inputWrapper}
              inputClass={styles.inputWithIcon}
              iconClass={styles.inputIcon}
              toggleButtonClass={styles.toggleVisibility}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Confirm Password</label>
            <PasswordInput
              name="confirmPassword"
              value={formik.values.confirmPassword || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Confirm your password"
              wrapperClass={styles.inputWrapper}
              inputClass={styles.inputWithIcon}
              iconClass={styles.inputIcon}
              toggleButtonClass={styles.toggleVisibility}
            />
          </div>

          <div className={styles.termsRow}>
            <input type="checkbox" name="terms" onChange={formik.handleChange} />
            <span>
              I agree to the <a href="/" className={styles.link}>Terms of Service</a> and <a href="/" className={styles.link}>Privacy Policy</a>
            </span>
          </div>

          {/* Validation and server errors */}
          {formik.touched.password && formik.errors.password && (
            <p className={styles.error}>{formik.errors.password}</p>
          )}
          {actionData?.error && (
            <p className={styles.error}>{actionData.error}</p>
          )}

          <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          <div className={styles.divider}>
            <span className={styles.dividerText}>or sign up with</span>
          </div>
          

          <div className={styles.footer}>
            Already have an account?
            <Link to="/login" className={styles.signinLink}> Sign in</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;