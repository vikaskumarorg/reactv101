import './App.css';
import { peopleData } from './app-data';
import Professions from './profession-group';


function App() {
  const chemist = peopleData.filter( p=> p.profession === 'chemist');
  const physicist = peopleData.filter( p=> p.profession === 'physicist');

  return (
   <div>
    <Professions users={chemist} heading="Chemist"></Professions>
    <Professions users={physicist} heading="Physicist"></Professions>
   </div>

  );
}
export default App;


