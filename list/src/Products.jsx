import { people } from './data';
import { getImageURL } from './utility';

function ProductList() {
  const personList = people.map(person => (
    <li key={person.id} className="product-card">
      <div className="product-media">
        <img src={getImageURL(person)} alt={person.name} className="circle-image" />
      </div>
      <div className="product-info">
        <h2>{person.name}</h2>
        <p className="profession">{person.profession}</p>
        <p className="accomplishment">Known for {person.accomplishment}.</p>
      </div>
    </li>
  ));

  return <ul className="product-list">{personList}</ul>;
}

export default ProductList;