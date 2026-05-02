import './App.css';
import MeetingsByAPI from './MeetingsByAPI';
import Products from './Products';
import NestedListRecipies from './NestedListRecipies';
import MakeCards from './MakeCards';
function App() {
  return (
    <div className="App">
      <MeetingsByAPI />
      <div className='inline-flex'>
      <Products />
      <NestedListRecipies />
      </div>
     
      
      <MakeCards />
    </div>
  );
}

export default App;
