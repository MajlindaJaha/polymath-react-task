import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../api";

const AddListForm = () => {
  const handlePostList = async (values) => {
    try {
      await api.post(`/list`, values);
      window.location.reload();
    } catch (error) {
      console.error("Error adding new list:", error);
    }
  };

  return (
    <div className="container mt-3 shadow-lg p-3 mb-5 bg-white rounded border">
      <h2 className="mt-4">Lists</h2>

      <div className="mt-4">
        <h4>Add New List</h4>
        <Formik
          initialValues={{ name: "", description: "" }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Name is required"),
            description: Yup.string().required("Description is required"),
          })}
          onSubmit={handlePostList}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field type="text" name="name" className="form-control" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field
                  type="text"
                  name="description"
                  className="form-control"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                Add List
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddListForm;
