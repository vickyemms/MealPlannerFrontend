import { useParams, useNavigate } from "react-router-dom";

const RecipeDetail = ({ recipes }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = recipes.find((r) => r.id.toString() === id);

  if (!recipe) {
    return <p>Recipe not found!</p>;
  }

  return (
    <div className="recipe-details-page-container">
      <button className="recipe-details-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="recipe-details-page">
        <h2>{recipe.name}</h2>
        <img
          src={recipe.imageURL}
          alt={recipe.name}
          className="recipe-details-image"
        />
        <div className="recipe-details-ingredients">
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.name}>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
        <h3>Instructions</h3>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
