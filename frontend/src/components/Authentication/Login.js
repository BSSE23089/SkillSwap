import React from "react";
import { Form, Link } from "react-router-dom";
import { useFormik } from "formik";
import { Mail } from "lucide-react";
import PasswordInput from "../common/PasswordInput";
import classes from "./Login.module.css";

const LoginForm = () => {
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
    onSubmit: () => {} // React Router handles the real submission
  });

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

        <Form method="POST" className={classes.form}>
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
