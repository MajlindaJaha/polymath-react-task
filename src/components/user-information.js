import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import api from "../api";
const UserInformation = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/user/data");
        setUserData(response.data);
      } catch (err) {
        setError(err.response.data.error);
      }
    };

    fetchUserData();
  }, []);
  const handleSubmit = async (values, formikHelpers) => {
    try {
      const response = await api.put("user/update-profile", {
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
      });
      if (response.data) {
        setMessage("success");
        setError("");
      }
    } catch (err) {
      setError(err.response.data.error);
      setMessage("");
    }
  };
  if (userData === null) {
    return <div></div>;
  }
  return (
    <div className="col-md-6">
      <h2>User Information</h2>
      <Formik
        initialValues={{
          firstName: userData.firstname,
          lastName: userData.lastname,
          email: userData.email,
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("First Name is required"),
          lastName: Yup.string().required("Last Name is required"),
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <Field
                type="text"
                name="firstName"
                className={`form-control ${
                  touched.firstName && errors.firstName ? "is-invalid" : ""
                }`}
              />
              {touched.firstName && errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <Field
                type="text"
                name="lastName"
                className={`form-control ${
                  touched.lastName && errors.lastName ? "is-invalid" : ""
                }`}
              />
              {touched.lastName && errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                className={`form-control ${
                  touched.email && errors.email ? "is-invalid" : ""
                }`}
              />
              {touched.email && errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <button
              variant="secondary"
              type="submit"
              className="btn btn-secondary w-100 mt-2 mb-2"
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
    </div>
  );
};

export default UserInformation;
