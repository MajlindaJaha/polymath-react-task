import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../api";
import AssignTaskForm from "./forms/assigne-task-to-list";
import AddListForm from "./forms/add-new-list";

const ListComponent = ({ lists, setLists }) => {
  const [isEditingList, setIsEditingList] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleEditList = (listId) => {
    setIsEditingList(listId);
  };

  const handleDeleteList = async (listId) => {
    try {
      const response = await api.delete(`list/${listId}`);
      if (response.data === true) {
        console.log("trueeee");
        window.location.reload();
      }
    } catch (error) {
      window.location.reload();
      console.error("Error deleting list:", error);
    }
  };

  const handleSubmitList = async (values, actions) => {
    try {
      if (isEditingList) {
        await api.put(`list/${isEditingList}`, values);
        console.log("List updated successfully");

        window.location.reload();
      } else {
        const response = await api.post("/list", values);
        console.log("List created successfully:", response.data);

        window.location.reload();
      }
      actions.resetForm();
      setIsEditingList(null);
    } catch (error) {
      window.location.reload();
      console.error("Error submitting list form:", error);
    }
  };

  return (
    <div className="containerbtn  m-5  ">
      <h2 className="mt-4">Lists</h2>

      {lists.map((list) => (
        <div
          key={list.id}
          className="mt-3 shadow-lg p-3 mb-5 bg-white rounded border"
        >
          {isEditingList === list.id ? (
            <Formik
              initialValues={{ name: list.name, description: list.description }}
              validationSchema={validationSchema}
              onSubmit={handleSubmitList}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="form-group">
                    <Field
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      type="text"
                      name="description"
                      placeholder="Description"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mr-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsEditingList(null)}
                  >
                    Cancel
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              <div className=" ">
                {" "}
                <button
                  className="btn btn-outline-primary mb-2"
                  onClick={() => handleEditList(list.id)}
                >
                  <FaEdit /> Edit List
                </button>
                <button
                  className="btn btn-outline-danger mb-2 ml-2"
                  onClick={() => handleDeleteList(list.id)}
                >
                  <FaTrash /> Delete List
                </button>
              </div>
              <h4>{list.name}</h4>
              <p>{list.description}</p>

              <ul className="list-group">
                {list.tasks.map((task) => (
                  <li key={task.id} className="list-group-item">
                    <div>
                      <strong>{task.title}</strong> - {task.description}
                    </div>
                    <ul className="list-group mt-2">
                      {task.subtasks.map((subtask) => (
                        <li key={subtask.id} className="list-group-item">
                          {subtask.title} - {subtask.description}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ListComponent;
