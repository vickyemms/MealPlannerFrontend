import React from "react";

const IngredientPopup = ({
  recipe,
  selectedIngredients,
  onCheckboxChange,
  onClose,
  onConfirm,
}) => {
  const notFoundAtHome = recipe.ingredients.filter((ing) => !ing.foundAtHome);
  const foundAtHome = recipe.ingredients.filter((ing) => ing.foundAtHome);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Select Ingredients to Add</h2>

        <div className="ingredient-section">
          <h3>Add Ingredients</h3>
          {notFoundAtHome.map((ingredient) => (
            <label key={ingredient.name}>
              <input
                type="checkbox"
                checked={selectedIngredients.has(ingredient.name)}
                onChange={() => onCheckboxChange(ingredient.name)}
              />
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </label>
          ))}
        </div>

        <div className="ingredient-section">
          <h3>Usually Found at Home</h3>
          {foundAtHome.map((ingredient) => (
            <label key={ingredient.name}>
              <input
                type="checkbox"
                checked={selectedIngredients.has(ingredient.name)}
                onChange={() => onCheckboxChange(ingredient.name)}
              />
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </label>
          ))}
        </div>

        <div className="popup-buttons-container">
          <button className="popup-button" onClick={onClose}>
            Cancel
          </button>
          <button className="popup-button" onClick={onConfirm}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredientPopup;
