import React, { useEffect, useState } from "react";

import Task from "./task";
import { FaPlus } from "react-icons/fa";
import api from "../api";
import AddNewTask from "./forms/add-new-task";
const TasksComponent = ({ addTask, completeTask, deleteTask }) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [tasksdata, setTasksData] = useState(null);
  const [listsData, setListsData] = useState(null);
  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        const response = await api.get("/task/all");

        setTasksData(response.data.results);
      } catch (err) {
        setError(err.response.data.error);
      }
    };
    const fetchListsData = async () => {
      try {
        const response = await api.get("/list/all");

        setListsData(response.data.results);
      } catch (err) {
        setError(err.response.data.error);
      }
    };

    fetchListsData();

    fetchTasksData();
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  if (listsData === null || tasksdata === null) {
    return <div></div>;
  }
  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Tasks</h2>
      <button
        className="btn btn-outline-primary mb-3"
        onClick={() => setShowPopup(true)}
      >
        <FaPlus /> Add New Task
      </button>
      {showPopup && (
        <div>
          <div className="overlay" onClick={() => setShowPopup(false)}></div>
          <AddNewTask
            listsData={listsData}
            setShowPopup={setShowPopup}
            setError={setError}
            setMessage={setMessage}
            setTasksData={setTasksData}
            tasksdata={tasksdata}
            createTask={true}
          />
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Due Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasksdata.map((task) => (
            <Task
              key={task.id}
              task={task}
              onComplete={tasksdata.completed}
              setError={setError}
              setMessage={setMessage}
              setTasksData={setTasksData}
              tasksdata={tasksdata}
              listsData={listsData}
              setShowPopup={setShowPopup}
              showPopup={showPopup}
            />
          ))}
        </tbody>
      </table>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
    </div>
  );
};

export default TasksComponent;
