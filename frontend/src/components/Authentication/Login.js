import React from "react";
import { Form, Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { Mail } from "lucide-react";
import PasswordInput from "../common/PasswordInput";
import classes from "./Login.module.css";
import Prompt from "../../UI/Prompt";
import { useActionData } from "react-router-dom";

const LoginForm = () => {
  const actionData = useActionData();
  const location = useLocation();
  const [prompt, setPrompt] = React.useState({ message: "", type: "info" });
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate: (values) => {
      const errors = {};
      if (!values.email) {errors.email = "Email is required";}
      else if (!/\S+@\S+\.\S+/.test(values.email))
        {errors.email = "Invalid email address"};

      if (!values.password) {errors.password = "Password is required";

        }
      return errors;
    },
    onSubmit: () => {}, // Let React Router handle the real submit
  });

  React.useEffect(() => {
    // Show prompt if redirected from signup
    const params = new URLSearchParams(location.search);
    if (params.get("signup") === "success") {
      setPrompt({ message: "Signup successful! Please log in.", type: "success" });
    }
  }, [location.search]);

  React.useEffect(() => {
    if (actionData) {
      if (actionData.error) {
        setPrompt({ message: actionData.error, type: "error" });
      } else if (actionData.success) {
        setPrompt({ message: actionData.success, type: "success" });
      } else {
        setPrompt({ message: "", type: "info" });
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
        <Prompt type={prompt.type} message={prompt.message} onClose={() => setPrompt({ message: "", type: "info" })} />

        <Form method="POST" className={classes.form}
          onSubmit={e => {
            const errors = formik.validateForm();
            Promise.resolve(errors).then(errObj => {
              if (Object.keys(errObj).length > 0) {
                e.preventDefault();
                formik.setTouched({ email: true, password: true });
              }
            });
          }}
        >
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

          <div className={classes.row}>
            <label className={classes.remember}>
              <input type="checkbox" name="remember" />
              Remember me
            </label>
            <a className={classes.forgotLink} href="/">Forgot password?</a>
          </div>

          <button
            className={classes.submitButton}
            type="submit"
            disabled={!!Object.keys(formik.errors).length}
          >
            Sign In
          </button>

          <div className={classes.divider}>
            <span className={classes.dividerText}>or continue with</span>
          </div>

          
          <div className={classes.footer}>
            Don't have an account?
            <Link to="/" className={classes.signupLink}> Sign up</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
