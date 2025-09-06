import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const API_BASE = import.meta.env.VITE_API_BASE_URL ;

function Login() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters") // ← was 6
    .required("Password is required"),
});


  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: values.email,   // backend accepts email or phone via "login"
          password: values.password,
          device: "web",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Try to surface backend validation or error message
        const msg =
          (data?.errors &&
            (data.errors.login?.[0] ||
             data.errors.password?.[0] ||
             Object.values(data.errors)?.[0]?.[0])) ||
          data?.message ||
          `Login failed (HTTP ${res.status})`;
        alert(msg);
        return;
      }

      // Success shape: { ok:true, data:{ user, token } }
      const token = data?.data?.token || data?.token;
      const user  = data?.data?.user  || data?.user;

      if (token) localStorage.setItem("auth_token", token);
      if (user)  localStorage.setItem("auth_user", JSON.stringify(user));
      if (user?.shop_id) localStorage.setItem("shop_id", String(user.shop_id));

      alert("Login successful!");
      resetForm();
      navigate("/dashboard");
    } catch (err) {
      alert(err?.message || "Network error while logging in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="shohojcart-login">
      <div className="login-card">
        <div className="logo">Shohoj Cart</div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
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

              <div className="forgot-password">
                <span onClick={() => navigate("/forgot")}>
                  Forgot password?
                </span>
              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="signup-text">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
