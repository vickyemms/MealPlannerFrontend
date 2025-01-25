import React from "react";

const Recipes = ({ recipes, onAddToGroceryList }) => {
  return (
    <div className="recipes-list">
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes available. Fetch some recipes!</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id} className="recipe-item">
              <span>{recipe.name}</span>
              <button
                onClick={() => onAddToGroceryList(recipe)}
                className="add-button"
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recipes;
