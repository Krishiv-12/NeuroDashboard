import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api";

const TasksWidget = () => {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const token = localStorage.getItem("token");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  // Add new task
  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    try {
      const res = await axios.post(
        "/api/tasks",
        { title: newTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks([res.data, ...tasks]);
      setNewTitle("");
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  // Toggle complete (mark as completed)
  const handleToggle = async (task) => {
    try {
      const res = await axios.put(
        `/api/tasks/${task._id}`,
        { completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  // Edit task
  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setEditTitle(task.title);
  };

  // Save edited task
  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return;
    try {
      const res = await axios.put(
        `/api/tasks/${editTaskId}`,
        { title: editTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(tasks.map((t) => (t._id === editTaskId ? res.data : t)));
      setEditTaskId(null);
      setEditTitle("");
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="bg-white dark:bg-slate-300 p-6 rounded-2xl shadow-lg w-full max-w-xl mx-auto">
      <h3 className="text-2xl text-center font-bold mb-6">
        📋 My Tasks
      </h3>
  
      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-100 text-green-700 p-4 rounded-xl shadow-sm">
          <h4 className="text-sm font-semibold mb-1">Completed</h4>
          <p className="text-xl font-bold">{completedTasks}</p>
        </div>
        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-xl shadow-sm">
          <h4 className="text-sm font-semibold mb-1">Pending</h4>
          <p className="text-xl font-bold">{pendingTasks}</p>
        </div>
      </div>
  
      {/* Add Task */}
      <div className="flex flex-col gap-2 mb-6">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter new task..."
          className="flex-1 border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white px-4 py-2 rounded-xl shadow-sm"
        >
          Add
        </button>
      </div>
  
      {/* Task List */}
      <div className="h-56 overflow-y-auto bg-slate-100 rounded-xl p-2">
      <ul className="space-y-3 shadow-md whitespace-pre-wrap pr-1">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-xl shadow-sm hover:shadow-md transition"
          >
            {editTaskId === task._id ? (
              <div className="flex flex-col sm:flex-row gap-2 flex-1 mr-2">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-lg w-full sm:w-auto"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditTaskId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div
                  className={`flex-1 text-sm cursor-pointer ${
                    task.completed ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                  onClick={() => handleToggle(task)}
                >
                  {task.title}
                </div>
                <div className="flex gap-2 text-sm">
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  {!task.completed && (
                    <button
                      onClick={() => handleToggle(task)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Done
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );  
};

export default TasksWidget;
