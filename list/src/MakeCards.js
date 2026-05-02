import React, { useState } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { people } from './data';

const MakeCards = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = people.map(person => ({
    value: person.id,
    label: person.name,
  }));

  const handleChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  return (
    <div className="container mt-5">
      <h2>Multi-Select People Dropdown</h2>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        placeholder="Select people..."
        className="mb-3"
      />
      {selectedOptions.length > 0 && (
        <div>
          <h3>Selected People:</h3>
          <ul className="list-group">
            {selectedOptions.map(option => {
              const person = people.find(p => p.id === option.value);
              return (
                <li key={option.value} className="list-group-item">
                  <strong>{person.name}</strong> - {person.profession}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MakeCards;