import React from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

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
      .min(6, "Password must be at least 6 characters") // backend accepts 8+, but we'll keep your UI text
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          // phone is optional; add here if you later include it in the form
          device: "web",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Show first validation error or generic message
        const firstError =
          (data?.errors &&
            Object.values(data.errors)[0] &&
            Object.values(data.errors)[0][0]) ||
          data?.message ||
          `Registration failed (HTTP ${res.status})`;
        alert(firstError);
        return;
      }

      // Success -> backend returns { ok: true, data: { user, token } }
      alert("Signup successful!");
      resetForm();
      navigate("/login");
    } catch (err) {
      alert(err?.message || "Network error while signing up");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="shohojcart-signup">
      <div className="signup-card">
        <div className="logo">Shohoj Cart</div>
        <div className="sub-text">Create your account</div>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <Field
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="form-input"
                />
                <ErrorMessage name="name" component="div" className="error" />
              </div>

              <div className="form-group">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="form-input"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-input"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              <button
                type="submit"
                className="signup-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="login-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
