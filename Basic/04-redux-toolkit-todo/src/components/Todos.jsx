import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../feature/todo/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // State to track the ID of the todo in edit mode and the edited text
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleUpdateClick = (id, text) => {
    // Toggle edit mode by setting the editTodoId state
    setEditTodoId(id === editTodoId ? null : id);
    // Set the edited text to the current todo text
    setEditedText(text);
  };

  const handleUpdateTodo = (id) => {
    // Dispatch the updateTodo action with the ID and edited text
    dispatch(updateTodo({ id, text: editedText }));

    // Exit edit mode
    setEditTodoId(null);
  };

  return (
    <>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            {editTodoId === todo.id ? (
              // Render input for editing in edit mode
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button
                  onClick={() => handleUpdateTodo(todo.id)}
                  className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                >
                  Save
                </button>
              </>
            ) : (
              // Render normal content
              <>
                <button
                  onClick={() => handleUpdateClick(todo.id, todo.text)}
                  className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                >
                  Update
                </button>
                <div className="text-white">{todo.text}</div>
                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                >
                  {/* ... button content */}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
