
import './App.css';
import Effect from './Effect';
import MouseEffect from './MouseEffect';
import { UserContext } from './UserContext';
import { useState } from 'react';

function App() {

  const [user] = useState(
    {name:"Ravi", 
    location:"Noida"}
  );
  return (
    <UserContext.Provider value={user}>
    <div className="App">
    <Effect />
     <MouseEffect />
    </div>
    </UserContext.Provider>
  );
}

export default App;
