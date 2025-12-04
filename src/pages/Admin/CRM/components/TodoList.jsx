// // components/TodoList.jsx
// import React from "react";

// const TodoList = () => {
//   const todos = [
//     { id: 1, task: "Prepare client report", done: false },
//     { id: 2, task: "Email invoice", done: true },
//   ];

//   return (
//     <div className="bg-white rounded-xl shadow p-4">
//       <h2 className="text-lg font-semibold mb-3">To-Do List</h2>

//       {todos.map((t) => (
//         <div
//           key={t.id}
//           className="flex justify-between items-center p-2 border-b"
//         >
//           <span className={t.done ? "line-through text-gray-400" : ""}>
//             {t.task}
//           </span>
//           <input type="checkbox" checked={t.done} readOnly />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TodoList;


// components/TodoList.jsx
import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, task: "Prepare client report", done: false },
    { id: 2, task: "Email invoice", done: true },
  ]);

  const [newTask, setNewTask] = useState("");

  // Add new task
  const addTodo = () => {
    if (newTask.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      task: newTask,
      done: false,
    };

    setTodos([newTodo, ...todos]);
    setNewTask("");
  };

  // Toggle task complete / incomplete
  const toggleDone = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  // Delete task
  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      
      <h2 className="text-lg font-semibold mb-3">To-Do List</h2>

      {/* Input Section */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add new task..."
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Tasks List */}
      <div className="space-y-2">
        {todos.length === 0 && (
          <p className="text-gray-500 text-sm">No tasks added yet.</p>
        )}

        {todos.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border"
          >
            {/* Task Name */}
            <span
              className={`flex-1 ${
                t.done ? "line-through text-gray-400" : ""
              }`}
            >
              {t.task}
            </span>

            {/* Mark Complete */}
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggleDone(t.id)}
              className="mr-3 h-4 w-4 cursor-pointer"
            />

            {/* Delete Button */}
            <button
              onClick={() => deleteTodo(t.id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
