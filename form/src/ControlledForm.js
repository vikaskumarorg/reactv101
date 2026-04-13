import { useRef } from 'react';
const Form = () => { 
 const [value, setValue] = useState(""); 

 const handleSubmit = (event) => { 
   setValue(inputRef.current.value);
 
   // Do something with the value 
 } 
 return ( 
    <>
    Hi <span>{value}</span>
   <form> 
     <input value={value} onChange={(e) => setValue(e.target.value)} type="text" /> 
   </form>
   <button onClick={handleSubmit}>Submit</button>
  
    </>
 );
}; 
a
export default Form;