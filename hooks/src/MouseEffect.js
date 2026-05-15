import { useEffect, useState, useRef } from "react";

const MouseEffect = () => {
  const [mPosition, setMPosition] = useState({ x: 0, y: 0 });
  const bRef = useRef(null)

  useEffect(() => {
    const moveElement = (event) => {
      setMPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };
    const downElement = (event) => {
      if(bRef.current){
        bRef.current.style.background = "red";
      }
    }
    const mouseupElement = (event) => {
      if(bRef.current){
       bRef.current.style.background = "#ffcb00";
      }
    }
    window.addEventListener("mousedown", downElement);
      window.addEventListener("mousemove", moveElement);
    window.addEventListener("mouseup", mouseupElement);

    return () => {
      window.removeEventListener("mousemove", moveElement);
      window.removeEventListener("mousedown", downElement);
      window.removeEventListener("mouseup", mouseupElement);
    };
  }, []);

  return (
    <>    <div
    ref={bRef}
      style={{
        width: "100px",
        height: "100px",
        background: "#ffcb00",
      }}
    >
     Mouse down 
    </div>
<hr></hr>
<div
      style={{
        width: "20px",
        height: "20px",
        background: "#007bff",
        clipPath: "polygon(0 0, 100% 50%, 0 100%)",
        position: "absolute",
        left: `${mPosition.x}px`,
        top: `${mPosition.y}px`,
      }}
    />
    </>
  );
};

export default MouseEffect;
