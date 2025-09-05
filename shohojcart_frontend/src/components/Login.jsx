import React from "react";
import "./Login.css";
import password_icon from "../assets/password.png";
import email_icon from "../assets/email.png";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Login() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Login submitted:", values);

    // Simulate login API
    setTimeout(() => {
      alert("Login successful!");
      resetForm();
      navigate("/dashboard"); // redirect to dashboard after login
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="inputs">
              <div className="input">
                <img src={email_icon} alt="Email Icon" />
                <Field type="email" name="email" placeholder="Email" />
              </div>
              <ErrorMessage name="email" component="div" className="error" />

              <div className="input">
                <img src={password_icon} alt="Password Icon" />
                <Field type="password" name="password" placeholder="Password" />
              </div>
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="forgot-password">
              Lost password? <span onClick={() => navigate("/forgot")}>Click here!</span>
            </div>

            <div className="submit-container">
              <button
                type="button"
                className="submit signup"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>

              <button
                type="submit"
                className="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
