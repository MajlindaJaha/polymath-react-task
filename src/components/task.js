import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../api";
import { Link } from "react-router-dom";
const Task = ({
  task,
  onComplete,
  setError,
  setMessage,
  setTasksData,
  tasksdata,
  listsData,
}) => {
  const handleComplete = () => {
    onComplete(task.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`task/${id}`);
      if (response.data === true) {
        setError("");
        setMessage("Success");
        setTasksData(tasksdata.filter((task) => task.id !== id));
      }
    } catch (err) {
      setMessage("");
      setError(err.response.data.message);
    }
  };

  return (
    <tr>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{new Date(task.dueDate).toLocaleDateString("en-CA")}</td>
      <td>
        <div className="d-flex align-items-center">
          <Formik
            initialValues={{ completed: task.completed }}
            onSubmit={handleComplete}
          >
            <Form>
              <Field
                type="checkbox"
                name="completed"
                className="form-check-input mx-2 mt-2"
                disabled
              />
              <ErrorMessage
                name="completed"
                component="div"
                className="text-danger"
              />
            </Form>
          </Formik>

          <Link
            to={{
              pathname: `/tasks/edit/${task.id}`,
            }}
            className="btn  btn-outline-primary m-1 "
          >
            <FaEdit />
          </Link>

          <button
            className="btn btn-outline-danger"
            onClick={() => handleDelete(task.id)}
          >
            <FaTrash />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Task;
