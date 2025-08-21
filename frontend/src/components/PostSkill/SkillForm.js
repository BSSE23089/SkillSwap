import React from "react";
import { useFormik } from "formik";
import styles from "./SkillForm.module.css";
import { GraduationCap, User, Book, Tag, Clock, DollarSign } from "lucide-react";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import { Form } from "react-router-dom";
import Text from "../../UI/Text";

const SkillForm = ({ roles = ["teacher", "learner"] }) => {
  const categories = [
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Data Science",
    "Machine Learning",
    "AI",
    "Game Development",
    "Cloud Computing",
    "Cybersecurity",
    "Other",
  ];

  const levels = ["Beginner", "Intermediate", "Advanced"];

  const formik = useFormik({
    initialValues: {
      role: roles.length === 1 ? roles[0] : "teacher",
      title: "",
      category: "",
      level: "",
      tags: [],
      description: "",
      tagInput: "",

      // Teacher-only
      duration: "",
      cost: "",

      // Learner-only (optional, just for UX)
      availability: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.title) {errors.title = "Skill title is required";}
      if (!values.category) {errors.category = "Category is required";}
      if (!values.level) {errors.level = "Skill level is required";}
      if (!values.description) {errors.description = "Description is required";}

      if (values.role === "teacher") {
        if (!values.duration) {errors.duration = "Duration is required";}
        if (!values.cost) {errors.cost = "Cost is required";}
      }

      return errors;
    },
    onSubmit: (values) => {
      const { tagInput, ...formData } = values;
      console.log("Form submitted successfully", formData);
    },
  });

  const handleTagAdd = () => {
    if (
      formik.values.tagInput.trim() &&
      !formik.values.tags.includes(formik.values.tagInput.trim())
    ) {
      formik.setFieldValue("tags", [
        ...formik.values.tags,
        formik.values.tagInput.trim(),
      ]);
    }
    formik.setFieldValue("tagInput", "");
  };

  return (
    <Card className={styles["skill-form-card"]}>
      {/* Header */}
      <div className={styles["skill-form-header"]}>
        <GraduationCap className={styles["skill-form-icon"]} />
        <Text className={styles["skill-form-title"]}>Post Skill</Text>
      </div>

      {/* Role Selection */}
      {roles.length > 1 && (
        <div className={styles["role-selection-section"]}>
          <label className={styles["role-selection-label"]}>
            Select Your Role
          </label>
          <div className={styles["role-radio-group"]}>
            {roles.includes("teacher") && (
              <label className={styles["role-radio-item"]}>
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  checked={formik.values.role === "teacher"}
                  onChange={formik.handleChange}
                  className={styles["role-radio-input"]}
                />
                <User className={styles["role-radio-icon"]} />
                <Text className={styles["role-radio-text"]}>Teacher</Text>
              </label>
            )}
            {roles.includes("learner") && (
              <label className={styles["role-radio-item"]}>
                <input
                  type="radio"
                  name="role"
                  value="learner"
                  checked={formik.values.role === "learner"}
                  onChange={formik.handleChange}
                  className={styles["role-radio-input"]}
                />
                <Book className={styles["role-radio-icon"]} />
                <Text className={styles["role-radio-text"]}>Learner</Text>
              </label>
            )}
          </div>
        </div>
      )}

      {/* Form */}
      <Form onSubmit={formik.handleSubmit} className={styles["skill-form"]}>
        {/* Skill Title */}
        <div className={styles["form-field-group"]}>
          <label className={styles["form-field-label"]}>Skill Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter skill title (e.g. React Basics)"
            value={formik.values.title}
            onChange={formik.handleChange}
            className={styles["form-text-input"]}
          />
          {formik.errors.title && (
            <p className={styles["error-message"]}>{formik.errors.title}</p>
          )}
        </div>

        {/* Category */}
        <div className={styles["form-field-group"]}>
          <label className={styles["form-field-label"]}>Category</label>
          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            className={styles["form-select"]}
          >
            <option value="">Select a category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {formik.errors.category && (
            <p className={styles["error-message"]}>{formik.errors.category}</p>
          )}
        </div>

        {/* Level */}
        <div className={styles["form-field-group"]}>
          <label className={styles["form-field-label"]}>Level</label>
          <select
            name="level"
            value={formik.values.level}
            onChange={formik.handleChange}
            className={styles["form-select"]}
          >
            <option value="">Select level</option>
            {levels.map((lvl, idx) => (
              <option key={idx} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
          {formik.errors.level && (
            <p className={styles["error-message"]}>{formik.errors.level}</p>
          )}
        </div>

        {/* Teacher Only: Duration + Cost */}
        {formik.values.role === "teacher" && (
          <div className={styles["form-two-column"]}>
            <div className={styles["form-field-group"]}>
              <label className={styles["form-field-label"]}>
                Session Duration
              </label>
              <div className={styles["input-with-icon"]}>
                <Clock size={18} />
                <input
                  type="text"
                  name="duration"
                  placeholder="e.g. 1 hour"
                  value={formik.values.duration}
                  onChange={formik.handleChange}
                  className={styles["form-text-input"]}
                />
              </div>
              {formik.errors.duration && (
                <p className={styles["error-message"]}>
                  {formik.errors.duration}
                </p>
              )}
            </div>

            <div className={styles["form-field-group"]}>
              <label className={styles["form-field-label"]}>Cost</label>
              <div className={styles["input-with-icon"]}>
                <DollarSign size={18} />
                <input
                  type="number"
                  name="cost"
                  placeholder="Enter cost"
                  value={formik.values.cost}
                  onChange={formik.handleChange}
                  className={styles["form-text-input"]}
                />
              </div>
              {formik.errors.cost && (
                <p className={styles["error-message"]}>{formik.errors.cost}</p>
              )}
            </div>
          </div>
        )}

        {/* Learner Only: Availability */}
        {formik.values.role === "learner" && (
          <div className={styles["form-field-group"]}>
            <label className={styles["form-field-label"]}>Availability</label>
            <input
              type="text"
              name="availability"
              placeholder="e.g. Weekends, Evenings"
              value={formik.values.availability}
              onChange={formik.handleChange}
              className={styles["form-text-input"]}
            />
          </div>
        )}

        {/* Tags */}
        <div className={styles["tags-section"]}>
          <label className={styles["form-field-label"]}>Tags</label>
          <div className={styles["tag-input-container"]}>
            <input
              type="text"
              placeholder="Add a tag"
              name="tagInput"
              value={formik.values.tagInput}
              onChange={formik.handleChange}
              className={styles["form-text-input"]}
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className={styles["tag-add-button"]}
            >
              <Tag size={20} />
            </button>
          </div>
          <div className={styles["tags-list"]}>
            {formik.values.tags.map((tag, idx) => (
              <Text key={idx} className={styles["tag-item"]}>
                {tag}
              </Text>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className={styles["form-field-group"]}>
          <label className={styles["form-field-label"]}>Description</label>
          <textarea
            name="description"
            placeholder="Enter a brief description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className={styles["form-textarea"]}
          />
          {formik.errors.description && (
            <p className={styles["error-message"]}>
              {formik.errors.description}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button type="submit" variant="startLearning">
          Submit
        </Button>
      </Form>
    </Card>
  );
};

export default SkillForm;
