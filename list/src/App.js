import './App.css';
import MeetingsByAPI from './MeetingsByAPI';
import Products from './Products';
import NestedListRecipies from './NestedListRecipies';

function App() {
  return (
    <div className="App">
      <MeetingsByAPI />
      <div className='inline-flex'>
      <Products />
      <NestedListRecipies />
      </div>
    </div>
  );
}

export default App;
