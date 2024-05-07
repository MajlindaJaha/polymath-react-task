import React, { useEffect, useState } from "react";
import Header from "../components/header";
import ListsComponent from "../components/listComponent";
import api from "../api";
import AssignTaskForm from "../components/forms/assigne-task-to-list";
import AddListForm from "../components/forms/add-new-list";
const Lists = () => {
  const [isAddingTask, setIsAddingTask] = useState(null);
  const [addTask, setAddTask] = useState(false);
  const [addList, setAddList] = useState(false);
  const [listsData, setListsData] = useState(null);
  useEffect(() => {
    const fetchListsData = async () => {
      try {
        const response = await api.get("/list/all");
        setListsData(response.data.results);
      } catch (err) {}
    };

    fetchListsData();
  }, []);

  const handleAddList = (listId) => {
    setAddList(true);
  };
  if (!listsData) return <div></div>;
  return (
    <div className="">
      <Header />
      <div className="m-5">
        <button
          className="btn btn-outline-success m-2"
          onClick={() => {
            setAddList(true);
          }}
        >
          Add List
        </button>
        <button
          className="btn btn-outline-success m-2"
          onClick={() => {
            setAddTask(true);
          }}
        >
          Add Task
        </button>
        {addTask && (
          <div>
            <AssignTaskForm />
          </div>
        )}
        {addList && (
          <div>
            <AddListForm />
          </div>
        )}
      </div>
      <ListsComponent lists={listsData} setLists={setListsData} />
    </div>
  );
};

export default Lists;
