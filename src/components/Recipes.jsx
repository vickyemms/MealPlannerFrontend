import React from "react";
import Recipe from "./Recipe";
import "../styles/Recipes.css";

const Recipes = ({ recipes, onAddToGroceryList }) => {
  return (
    <div className="recipes-list">
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p className="recipes-unloaded">
          The recipes weren't able to load properly. Please try again!
        </p>
      ) : (
        <div>
          {recipes.map((recipe) => (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              onAddToGroceryList={onAddToGroceryList}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
