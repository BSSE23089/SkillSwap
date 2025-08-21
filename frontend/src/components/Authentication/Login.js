import { useState, useEffect } from "react";
import {
  Form,
  Link,
  useLocation,
  useNavigate,
  useActionData,
  useNavigation,   // ✅ import useNavigation
} from "react-router-dom";
import { useFormik } from "formik";
import { Mail } from "lucide-react";
import PasswordInput from "./PasswordInput";
import classes from "./Login.module.css";
import Prompt from "../../UI/Prompt";
import { useDispatch } from "react-redux";
import { loginSuccess as login } from "../../store/authSlice";

const LoginForm = () => {
  const actionData = useActionData();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigation = useNavigation(); // ✅ get navigation state

  const [prompt, setPrompt] = useState({ message: "", type: "info" });

  // ✅ Detect if form is currently submitting
  const isSubmitting = navigation.state === "submitting";

  // ✅ Handle successful login
  useEffect(() => {
    if (actionData?.success && actionData?.user) {
      dispatch(login(actionData.user));

      const timer = setTimeout(() => navigate("/dashboard"), 1000);
      return () => clearTimeout(timer);
    }
  }, [actionData, navigate, dispatch]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
    onSubmit: () => {}, // handled by React Router action
  });

  // Show "Signup success" if redirected from signup page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("signup") === "success") {
      setPrompt({
        message: "Signup successful! Please log in.",
        type: "success",
      });
    }
  }, [location.search]);

  // Show errors or success messages from action
  useEffect(() => {
    if (actionData) {
      if (actionData.error) {
        setPrompt({ message: actionData.error, type: "error" });
      } else if (actionData.message) {
        setPrompt({ message: actionData.message, type: "success" });
      }
    }
  }, [actionData]);

  return (
    <div className={classes.page}>
      <div className={classes.card}>
        <div className={classes.header}>
          <div className={classes.logo}>SS</div>
          <h1 className={classes.title}>SkillSwap</h1>
          <p className={classes.subtitle}>
            Welcome back! Sign in to continue your learning journey
          </p>
        </div>

        <Prompt
          type={prompt.type}
          message={prompt.message}
          onClose={() => setPrompt({ message: "", type: "info" })}
        />

        <Form
          method="POST"
          className={classes.form}
          onSubmit={(e) => {
            const errors = formik.validateForm();
            Promise.resolve(errors).then((errObj) => {
              if (Object.keys(errObj).length > 0) {
                e.preventDefault();
                formik.setTouched({ email: true, password: true });
              }
            });
          }}
        >
          {/* Email */}
          <div className={classes.control}>
            <label className={classes.label}>Email Address</label>
            <div className={classes.inputWrapper}>
              <Mail className={classes.inputIcon} size={20} />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={classes.inputWithIcon}
                autoComplete="email"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className={classes.error}>{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className={classes.control}>
            <label className={classes.label}>Password</label>
            <PasswordInput
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
              wrapperClass={classes.inputWrapper}
              inputClass={classes.inputWithIcon}
              iconClass={classes.inputIcon}
              toggleButtonClass={classes.toggleVisibility}
            />
            {formik.touched.password && formik.errors.password && (
              <p className={classes.error}>{formik.errors.password}</p>
            )}
          </div>

          {/* Remember / Forgot */}
          <div className={classes.row}>
            <label className={classes.remember}>
              <input type="checkbox" name="remember" />
              Remember me
            </label>
            <a className={classes.forgotLink} href="/">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            className={classes.submitButton}
            type="submit"
            disabled={!!Object.keys(formik.errors).length || isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>

          <div className={classes.divider}>
            <span className={classes.dividerText}>or continue with</span>
          </div>

          <div className={classes.footer}>
            Don't have an account?
            <Link to="/" className={classes.signupLink}>
              {" "}
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
