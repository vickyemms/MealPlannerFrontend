import React from "react";

const Recipes = ({ recipes, onAddToGroceryList }) => {
  return (
    <div className="recipes-list">
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>The recipes weren't able to load properly. Please try again!</p>
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
