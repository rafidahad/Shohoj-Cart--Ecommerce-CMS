import React from "react";
import "./Signup.css";
import user_icon from "../assets/person.png";
import password_icon from "../assets/password.png";
import email_icon from "../assets/email.png";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Signup() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Signup submitted:", values);

    // Simulate signup API
    setTimeout(() => {
      alert("Signup successful!");
      resetForm();
      navigate("/login"); // redirect to login after signup
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="inputs">
              <div className="input">
                <img src={user_icon} alt="User Icon" />
                <Field type="text" name="name" placeholder="Name" />
              </div>
              <ErrorMessage name="name" component="div" className="error" />

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

            <div className="submit-container">
              <button
                type="submit"
                className="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>

              <button
                type="button"
                className="submit login-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
