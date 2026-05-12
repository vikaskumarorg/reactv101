import './App.css';
import {useState} from 'react';
import MeetingsByAPI from './MeetingsByAPI';
import Products from './Products';
import NestedListRecipies from './NestedListRecipies';
import MakeCards from './MakeCards';
import { stories } from './data';
import { StoryTray } from './StoryTray';

function App() {

  const [newStories, setNewStories] = useState(stories);

  function blankStory() {
    return {
      id : "Create",
      label :"Add new story here}"
    }
  }

  function AddStory() {
    const newStory = {
      id : `Story ${newStories.length + 1}`,
      label : `Story ${newStories.length + 1}`
    };
    setNewStories([ ...newStories,newStory]);
  }

  return (
    <div className="App">
      <MeetingsByAPI />

      <div className='inline-flex'>
      <Products />
      <NestedListRecipies />
      </div>

      <MakeCards />

      <div>
        <StoryTray stories={newStories} addStory={AddStory} />
      </div>

    </div>
  );
}

export default App;
