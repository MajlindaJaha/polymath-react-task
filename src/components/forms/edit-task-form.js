import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../api";
import { FaTrash } from "react-icons/fa";
const EditTaskForm = ({
  setSelectedListId,
  listsData,
  taskdata,
  selectedListId,
  id,
  editTask,
}) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async (id) => {
    try {
      setIsSubmitting(true); // Shënoni fillimin e dërgimit
      const response = await api.delete(`subtask/${id}`);
      if (response.data === true) {
        setError("");
        setMessage("Success");
        window.location.reload();
      }
    } catch (err) {
      setMessage("");
      setError(err.response.data.message);
    } finally {
      setIsSubmitting(false); // Shënoni përfundimin e dërgimit, pavarësisht nëse ka ndodhur një gabim
    }
  };

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true); // Shënoni fillimin e dërgimit
      const data = {
        title: values.title,
        description: values.description,
        dueDate: values.dueDate,
        completed: values.completed,
      };
      if (values.listId) {
        data.listId = values.listId;
      }

      let response;
      editTask === true
        ? (response = await api.put(`task/${id}`, data))
        : (response = await api.put(`subtask/${id}`, data));

      if (response.data) {
        setMessage("success");
        setError("");
        window.location.reload();
      }
    } catch (err) {
      setError(err.response.data.error);
      setMessage("");
    } finally {
      setIsSubmitting(false); // Shënoni përfundimin e dërgimit, pavarësisht nëse ka ndodhur një gabim
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    dueDate: Yup.date().required("Due date is required"),
    listId: Yup.string(),
  });

  const handleListChange = (e, formikProps) => {
    setSelectedListId(e.target.value);
    formikProps.handleChange(e);
  };

  if (listsData === null || taskdata === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={` ${!editTask && "m-5"}`}>
      <Formik
        initialValues={{
          title: taskdata?.title || "",
          description: taskdata?.description || "",
          dueDate:
            new Date(taskdata?.dueDate).toLocaleDateString("en-CA") || "",
          listId: taskdata?.listId || selectedListId,
          completed: taskdata?.completed || false,
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ handleChange }) => (
          <Form>
            <div className="form-group">
              <label>Title</label>
              <Field
                type="text"
                name="title"
                placeholder="Title"
                className="form-control mb-3"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <Field
                type="text"
                name="description"
                placeholder="Description"
                className="form-control mb-3"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <Field type="date" name="dueDate" className="form-control mb-3" />
              <ErrorMessage
                name="dueDate"
                component="div"
                className="text-danger"
              />
            </div>
            {editTask && (
              <div className="form-group">
                <label>Select List</label>
                <Field
                  as="select"
                  name="listId"
                  className="form-control mb-3"
                  onChange={(e) => handleListChange(e, { handleChange })}
                  value={selectedListId}
                >
                  <option value="">Select a list</option>
                  {listsData.map((list) => (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="listId"
                  component="div"
                  className="text-danger"
                />
              </div>
            )}
            <div className="form-group">
              <label>
                <Field className="mx-2" type="checkbox" name="completed" />
                Completed
              </label>
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-outline-success mt-2">
                Save
              </button>
              {!editTask && (
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => handleDelete(id)}
                  disabled={isSubmitting} // Parandaloni klikimin nëse është duke u dërguar
                >
                  <FaTrash />
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>

      {error && <div className="alert alert-danger m-2">{error}</div>}
      {message && <div className="alert alert-success m-2">{message}</div>}
    </div>
  );
};

export default EditTaskForm;
