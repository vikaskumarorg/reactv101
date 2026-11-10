
import { useState } from 'react';
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from "../features/counter/counterSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";

function Counter() {
    const [inputNumber, setInputNumber] = useState<number>(5);
    const count = useAppSelector( (state) => state.counter.count);
    const dispatch = useAppDispatch();

    return (
    <div>
      <h1>Redux Toolkit Counter</h1>

      <h2>Count: {count}</h2>

      <button onClick={() => dispatch(increment())}>
        Increment
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>
            <button onClick={() => dispatch(reset())}>
        Reset
      </button>

<div>
    <input value={inputNumber} onChange={(e) => setInputNumber(parseInt(e.target.value) || 0)} />
 <button
        onClick={() => dispatch(incrementByAmount(inputNumber))}>
        Increment By Any number
      </button>
</div>
     

 

    </div>
  );
}

export { Counter };