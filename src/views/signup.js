import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { BiShow, BiHide } from "react-icons/bi";

const Signup = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "password should be at least 8 caracters")
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number"
      ),
  });

  const handleSubmit = async (values, formikHelpers) => {
    try {
      const response = await api.post("user/signup", {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
      });
      if (response.data) {
        return navigate("/login");
      }
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="col-md-4">
        <div className="card shadow p-4">
          <h1 className="text-center mb-4">Sign Up</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="firstname" className="form-label">
                    First Name
                  </label>
                  <Field
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="form-control"
                    placeholder="Enter your first name"
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastname" className="form-label">
                    Last Name
                  </label>
                  <Field
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="form-control"
                    placeholder="Enter your last name"
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <Field
                      type={showPassword ? "text" : "password"} // Toggle between text and password type
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                    >
                      {showPassword ? <BiHide /> : <BiShow />}{" "}
                      {/* Show eye icons based on password visibility state */}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-secondary w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-3 text-center">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
