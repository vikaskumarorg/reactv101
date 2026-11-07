import { useState, useReducer } from "react";


interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
interface TodoState {
  todos: Todo[];
}
type TodoAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: number }
  | { type: "TOGGLE_TODO"; payload: number }
  | {
      type: "EDIT_TODO";
      payload: { id: number; text: string };
    }
  | { type: "CLEAR_COMPLETED" };

// 4. Initial State
const initialState: TodoState = {
  todos: [],
};
 interface payload { id:string | null; text: string };


// Reducer function
function todoReducer(
  state: TodoState,
  action: TodoAction
): TodoState {
  switch (action.type) {

    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => todo.id !== action.payload
        ),
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => !todo.completed
        ),
      };

    default:
      return state;
  }
}


function Todo(){
    const [input, setInput] = useState<string>("");
  const [filter, setFilter] = useState<
    "ALL" | "ACTIVE" | "COMPLETED"
  >("ALL");

  const [editingId, setEditingId] = useState<number | null>(
    null
  );

  const [state, dispatch] = useReducer(
    todoReducer,
    initialState
  );




  // Add Todo
  const handleAddTodo = () => {
    if (!input.trim()) return;

    dispatch({
      type: "ADD_TODO",
      payload: input.trim(),
    });

    setInput("");
  };

   // Delete Todo
  const handleDeleteTodo = (id: number): void => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };

  // Toggle Todo
  const handleToggleTodo = (id: number): void => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: id,
    });
  };


  // Edit Todo
  const handleEditTodo = (todo: Todo): void => {
    setEditingId(todo.id);
    setInput(todo.text);
  };

  // Save Edited Todo
  const handleSaveEdit = (): void => {
    if (!input.trim() || editingId === null) return;

    dispatch({
      type: "EDIT_TODO",
      payload: {
        id: editingId,
        text: input.trim(),
      },
    });

    setEditingId(null);
    setInput("");
  };

  // Filter Todos
  const filteredTodos = state.todos.filter((todo) => {
    if (filter === "ACTIVE") return !todo.completed;
    if (filter === "COMPLETED") return todo.completed;
    return true;
  });

  // Pending Tasks
  const pendingCount = state.todos.filter(
    (todo) => !todo.completed
  ).length;

  return (

    <>
      <h5>React Todo App</h5>
    <div>
    <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter todo..."
      />
       {editingId ? (
        <button onClick={handleSaveEdit}>
          Save
        </button>
      ) : (
        <button onClick={handleAddTodo}>
          Add Todo
        </button>
      )}


 {/* Pending Count */}
      <p>Pending Tasks: {pendingCount}</p>

      {/* Filters */}
      <div>
        <button onClick={() => setFilter("ALL")}>
          All
        </button>

        <button onClick={() => setFilter("ACTIVE")}>
          Active
        </button>

        <button onClick={() => setFilter("COMPLETED")}>
          Completed
        </button>
      </div>

       {/* Todo List */}
      {/* Todo List */}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={{ margin: "12px 0" }}>
            <span
              onClick={() => handleToggleTodo(todo.id)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {todo.text}
            </span>

            <button onClick={() => handleEditTodo(todo)}>
              Edit
            </button>

            <button onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default Todo;