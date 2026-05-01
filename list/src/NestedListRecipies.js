import {recipes} from './data';

function NestedListRecipies() {
    
    const recipiesList = recipes.map((recipe) => {
        return (
            <div key={recipe.id} className="recipe-card">
                <h3>{recipe.name}</h3>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
        );
    });
  return <div className='product-list'><h2>Recipies</h2> {recipiesList}</div>;
}

export default NestedListRecipies;