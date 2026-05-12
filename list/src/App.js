import './App.css';
import MeetingsByAPI from './MeetingsByAPI';
import Products from './Products';
import NestedListRecipies from './NestedListRecipies';
import MakeCards from './MakeCards';
import { stories } from './data';
import { StoryTray } from './StoryTray';

function App() {
  return (
    <div className="App">
      <MeetingsByAPI />

      <div className='inline-flex'>
      <Products />
      <NestedListRecipies />
      </div>

      <MakeCards />

      <div>
        <StoryTray stories={stories} />
      </div>

    </div>
  );
}

export default App;
