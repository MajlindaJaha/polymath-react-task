import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import api from "../../api";
const ChangePasswordForm = () => {
  const [error, setError] = useState("");
  const handleSubmit = async (values) => {
    try {
      const response = await api.put("user/change-password", {
        oldPassword: values.oldPassword,
        password: values.newPassword,
        confirmPassword: values.confirmNewPassword,
      });
      if (response.data) {
      }
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="col-md-6 mt-5 mt-md-0">
      <h2>Change Password</h2>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        validationSchema={Yup.object().shape({
          oldPassword: Yup.string().required("Old Password is required"),
          newPassword: Yup.string().required("New Password is required"),
          confirmNewPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Confirm New Password is required"),
        })}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="oldPassword">Password</label>
              <Field
                type="password"
                name="oldPassword"
                className={`form-control ${
                  touched.oldPassword && errors.oldPassword ? "is-invalid" : ""
                }`}
              />
              {touched.oldPassword && errors.oldPassword && (
                <div className="invalid-feedback">{errors.oldPassword}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <Field
                type="password"
                name="newPassword"
                className={`form-control ${
                  touched.newPassword && errors.newPassword ? "is-invalid" : ""
                }`}
              />
              {touched.newPassword && errors.newPassword && (
                <div className="invalid-feedback">{errors.newPassword}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <Field
                type="password"
                name="confirmNewPassword"
                className={`form-control ${
                  touched.confirmNewPassword && errors.confirmNewPassword
                    ? "is-invalid"
                    : ""
                }`}
              />
              {touched.confirmNewPassword && errors.confirmNewPassword && (
                <div className="invalid-feedback">
                  {errors.confirmNewPassword}
                </div>
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
    </div>
  );
};

export default ChangePasswordForm;
