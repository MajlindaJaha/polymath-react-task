import React, { useEffect, useState } from "react";

import api from "../api";
import { Link, useParams } from "react-router-dom";
import EditTaskForm from "../components/forms/edit-task-form";
import AddNewTask from "../components/forms/add-new-task";

const EditTask = () => {
  const { id } = useParams();
  const [taskdata, setTaskData] = useState(null);
  const [selectedListId, setSelectedListId] = useState("");
  const [listsData, setListsData] = useState(null);
  const [addSubtask, setAddSubtask] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchListsData = async () => {
      try {
        const response = await api.get("/list/all");
        setListsData(response.data.results);
      } catch (err) {}
    };

    const fetchTaskData = async () => {
      try {
        const response = await api.get(`/task/${id}`);
        setTaskData(response.data);
        setSelectedListId(response.data.listId);
      } catch (err) {}
    };

    fetchListsData();
    fetchTaskData();
  }, [id]);

  if (listsData === null || taskdata === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-5">
      <Link className="btn btn-outline-primary" to="/tasks">
        Back
      </Link>
      <h3 className="mt-2">Edit Task</h3>
      <EditTaskForm
        setSelectedListId={setSelectedListId}
        listsData={listsData}
        taskdata={taskdata}
        selectedListId={selectedListId}
        id={id}
        editTask={true}
      />
      <div className="d-flex justify-content-between">
        <button
          type="submit"
          className="btn btn-outline-success mt-2 "
          onClick={() => setAddSubtask(true)}
        >
          Add Subtask
        </button>
      </div>

      {addSubtask === true && (
        <div>
          <AddNewTask
            listsData={listsData}
            setShowPopup={setShowPopup}
            setError={setError}
            setMessage={setMessage}
            taskId={id}
          />
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}
        </div>
      )}

      {taskdata.subtasks.length > 0 && (
        <div>
          <h4 className="m-5">Subtasks</h4>
          {taskdata.subtasks.map((subtask) => (
            <EditTaskForm
              setSelectedListId={setSelectedListId}
              listsData={listsData}
              taskdata={subtask}
              selectedListId={selectedListId}
              id={subtask.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EditTask;
