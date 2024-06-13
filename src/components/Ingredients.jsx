import React from "react";

const Ingredients = ({ ingredients, onCheckboxChange, onGenerateDrinks }) => (
  <div>
    <div className="ingredients-instructions">
      <p>Select the ingredients you have at home</p>
    </div>
    <div className="checkbox-group">
      {Object.keys(ingredients).map((ingredient) => (
        <div key={ingredient} className="checkbox-item">
          <label>
            <input
              type="checkbox"
              name={ingredient}
              checked={ingredients[ingredient]}
              onChange={onCheckboxChange}
            />
            {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
          </label>
        </div>
      ))}
    </div>
    <button className="content-button" onClick={onGenerateDrinks}>
      Generate Drinks
    </button>
  </div>
);

export default Ingredients;
