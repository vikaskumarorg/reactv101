import './App.css';

function StoryTray({ stories, addStory }) {
  const _storyTray = [...stories];

    _storyTray.push({ id : "Create", label :"Add story"});
  return (
    <ul>
      {_storyTray.map(story => (
        <li key={story.id} className="story" onClick={ () => story.id=== "Create" && addStory() }>
          {story.label}
        </li>
      ))}
    </ul>
  );
}

export { StoryTray };