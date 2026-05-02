import { people } from "./data";
import { getImageURL } from "./utility";
import { useState } from "react";

const SelectField = () => {
    const [selectedPerson, setSelectedPerson] = useState(null);
    const selectPeople = (person) => {
        setSelectedPerson(person);
    }
    let _people = people.filter(p => p.id );
    return (
        <div>
            <p>Select People</p>
            <select value={selectedPerson?.name || ""} onChange={(e) => selectPeople(people.find(p => p.name === e.target.value))}>
                <option value="">Select People</option>
                {_people.map(person => (
                    <option key={person.id} value={person.name}>
                        {person.name}
                    </option>
                ))}
            </select>

                {selectedPerson && 
            <div className="product-card">
                  <div className="product-media">
                    <img src={getImageURL(selectedPerson)} alt={selectedPerson?.name} className="circle-image" />
                  </div>
                  <div className="product-info">
                    <h2>{selectedPerson?.name}</h2>
                    <p className="profession">{selectedPerson?.profession}</p>
                    <p className="accomplishment">Known for {selectedPerson?.accomplishment}.</p>
                  </div>
                </div>
}
        </div>
    );
};

export default SelectField;