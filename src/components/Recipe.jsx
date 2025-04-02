import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Recipe.css";

const Recipe = ({ recipe, onAddToGroceryList }) => {
  const navigate = useNavigate();

  return (
    <div
      className="recipe-item"
      onClick={() => navigate(`/recipe/${recipe.id}`)}
    >
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
      <button
        className="add-button"
        onClick={(e) => {
          e.stopPropagation();
          onAddToGroceryList(recipe);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default Recipe;
