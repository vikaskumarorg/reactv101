import './App.css';
import { peopleData } from './app-data';
import Professions from './profession-group'

function App() {
  const _chemist = peopleData.filter( p=> p.profession === 'chemist');
  return (
   <div>
    <Professions users={_chemist} heading="Chemist"></Professions>
   </div>
  );
}

export default App;
