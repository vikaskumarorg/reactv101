import './App.css';
function StoryTray({ stories }) {
  const _storyTray = [...stories];
  _storyTray.push({
    id : "Create",
    label : "Create Story"
  });

  return (
    <ul>
      {_storyTray.map(story => (
        <li key={story.id} className="story">
          {story.label}
        </li>
      ))}
    </ul>
  );
}

export { StoryTray };