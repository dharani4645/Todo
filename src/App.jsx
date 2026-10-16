import { useEffect, useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Practice useEffect", completed: true }
  ]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Add new todo
  function handleSubmit(e) {
    e.preventDefault();

    if (task.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setTask("");
  }

  // Toggle checkbox
  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  // Derived value
  const incompleteCount = todos.filter(
    (todo) => !todo.completed
  ).length;

  // Effect 1: Update document title
  useEffect(() => {
    document.title = `Todos: ${incompleteCount} incomplete`;
  }, [incompleteCount]);

  // Effect 2: Window resize listener
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1>Todo Dashboard</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Add Todo
        </button>
      </form>

      <div style={styles.info}>
        <p>
          Total Todos: <strong>{todos.length}</strong>
        </p>

        <p>
          Incomplete: <strong>{incompleteCount}</strong>
        </p>

        
      </div>

      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.todo}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />

              <span
                style={{
                  textDecoration: todo.completed
                    ? "line-through"
                    : "none",
                  marginLeft: "10px"
                }}
              >
                {todo.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    fontFamily: "Arial"
  },
  form: {
    display: "flex",
    gap: "10px"
  },
  input: {
    flex: 1,
    padding: "10px"
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer"
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  todo: {
    padding: "12px",
    marginBottom: "8px",
    background: "#f1f1f1"
  }
};

export default App;