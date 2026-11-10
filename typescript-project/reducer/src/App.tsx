import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Todo from './reducer/TodoItems'
import { Counter } from './component/Counter'
import { Users } from './component/Users'


function App() {
  const [count, setCount] = useState(0);



  return (
    <>
      <section id="center"> 
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>


    <Todo></Todo>

        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

     <h5> Counter state Management by Redux toolkit</h5>
     <Counter></Counter>

    <Users></Users>


    </>
  )
}

export default App
