import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../api";

const AddNewTask = ({
  listsData,
  setShowPopup,
  setMessage,
  setError,
  setTasksData,
  tasksdata,
  createTask,
  taskId,
}) => {
  const [selectedListId, setSelectedListId] = useState("");

  const initialValuesRef = useRef({
    title: "",
    description: "",
    dueDate: "",
    listId: selectedListId,
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    dueDate: Yup.date().required("Due date is required"),
    listId: Yup.string(),
  });

  const handleSubmit = async (values, formikHelpers) => {
    try {
      const data = {
        title: values.title,
        description: values.description,
        dueDate: values.dueDate,
      };

      if (values.listId) {
        data.listId = values.listId;
      }
      if (createTask) {
      }
      let response;
      createTask === true
        ? (response = await api.post("task", data))
        : (response = await api.post(`subtask/${taskId}`, data));
      if (response.data) {
        setMessage("success");
        setError("");
        createTask === true && formikHelpers.resetForm();
        setShowPopup(false);
        createTask === true && setTasksData([...tasksdata, response.data]);
      }
    } catch (err) {
      setError(err.response.data.error);
      setMessage("");
      createTask === true && formikHelpers.resetForm();
      setShowPopup(false);
    }
  };

  const handleListChange = (e, formikProps) => {
    setSelectedListId(e.target.value);
    formikProps.handleChange(e);
  };

  useEffect(() => {
    initialValuesRef.current.listId = selectedListId;
  }, [selectedListId]);

  return (
    <div className={` ${createTask ? "popup-container" : "m-5"}`}>
      {createTask ? <h3>Add New Task</h3> : <h3>Add New Subtask</h3>}
      <Formik
        initialValues={initialValuesRef.current}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange }) => (
          <Form>
            <div className="form-group">
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
              <Field type="date" name="dueDate" className="form-control mb-3" />
              <ErrorMessage
                name="dueDate"
                component="div"
                className="text-danger"
              />
            </div>
            {createTask && (
              <div className="form-group">
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
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-outline-success">
                Add Task
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewTask;
