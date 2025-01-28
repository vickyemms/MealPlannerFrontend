import React from "react";

const Recipe = ({ recipe, onAddToGroceryList }) => {
  return (
    <div className="recipe-item">
      <img src={recipe.imageURL} alt={recipe.name} className="recipe-image" />
      <div className="recipe-details">
        <h3>{recipe.name}</h3>
        <p>
          <strong>Cuisine:</strong> {recipe.cuisine}
        </p>
        <p>
          <strong>Protein:</strong> {recipe.protein}
        </p>
        <p>
          <strong>Healthiness:</strong> {recipe.healthiness}
        </p>
      </div>
      <button onClick={() => onAddToGroceryList(recipe)} className="add-button">
        Add
      </button>
    </div>
  );
};

export default Recipe;
