import React, { useState, useEffect } from "react";
import api from "../../api";

const AssignTaskForm = () => {
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState([]);

  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [selectedListId, setSelectedListId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchLists();
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/task/all");
      setTasks(response.data.results);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const fetchLists = async () => {
    try {
      const response = await api.get("/list/all");
      setLists(response.data.results);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        taskId: selectedTaskId,
        listId: selectedListId,
      };
      const response = await api.post("/task/assign-to-list", data);
      if (response.status === 200) {
        setMessage("Task assigned to list successfully");
        setError("");
      }
    } catch (error) {
      setError("Error assigning task to list");
      setMessage("");
    }
  };
  return (
    <div className="container mt-4 mt-3 shadow-lg p-3 mb-5 bg-white rounded border">
      <h3>Assign Task to List</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="task">Select Task:</label>
          <select
            id="task"
            className="form-control"
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
          >
            <option value="">Select a task</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="list">Select List:</label>
          <select
            id="list"
            className="form-control"
            value={selectedListId}
            onChange={(e) => setSelectedListId(e.target.value)}
          >
            <option value="">Select a list</option>
            {lists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Assign Task
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {message && <div className="alert alert-success mt-3">{message}</div>}
    </div>
  );
};

export default AssignTaskForm;
