import { useState } from "react";

function Todo(){
   const [input, setInput] = useState("");


  return (

    <>
      <h5>React Todo App</h5>
    <div>
    <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter todo..."
      />

      <p>{input}</p>
    </div>
    </>
  );
}

export default Todo;