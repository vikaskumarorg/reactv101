import React, { useState, useEffect, useRef } from 'react';

function Effect() {
  const [count, setCount] = useState(234567);
  const pRef = useRef();

  useEffect(() => {
    if (pRef.current) {
      pRef.current.style.backgroundColor = `#${count.toString(16).padStart(6, '0')}`;
    }
    return () => {
        // it exxcute when component unmount or before next effect execute
      if (pRef.current) {
        pRef.current.style.backgroundColor = '';
      }
    }
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(count + 4000)}>Change color</button>
      <p ref={pRef} style={{color:'#fff'}}>Refresh background color</p>
    </div>
  );
}

export default Effect;