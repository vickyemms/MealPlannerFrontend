import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedItem, setSelectedItem] = useState("ingredients");
  const [ingredients, setIngredients] = useState({
    vodka: false,
    whiskey: false,
    gin: false,
    rum: false,
    scotch: false,
    brandy: false,
    bourbon: false,
    cognac: false,
    champagne: false,
    tequila: false,
    kahlua: false,
    cider: false,
    lager: false,
  });

  const handleNavClick = (item) => {
    setSelectedItem(item);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setIngredients((prevIngredients) => ({
      ...prevIngredients,
      [name]: checked,
    }));
  };

  const handleGenerateDrinks = () => {
    handleNavClick("drinks");
  };

  return (
    <div className="App">
      <h1 className="title">Bartender</h1>
      <div className="nav-bar">
        <ul className="nav-list">
          <li
            className={`nav-item ${
              selectedItem === "ingredients" ? "active" : ""
            }`}
            onClick={() => handleNavClick("ingredients")}
          >
            Ingredients
          </li>
          <li
            className={`nav-item ${selectedItem === "drinks" ? "active" : ""}`}
            onClick={() => handleNavClick("drinks")}
          >
            Drinks
          </li>
        </ul>
      </div>
      <div className="content">
        {selectedItem === "ingredients" ? (
          <div>
            <div className="checkbox-group">
              {Object.keys(ingredients).map((ingredient) => (
                <div key={ingredient} className="checkbox-item">
                  <label>
                    <input
                      type="checkbox"
                      name={ingredient}
                      checked={ingredients[ingredient]}
                      onChange={handleCheckboxChange}
                    />
                    {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                  </label>
                </div>
              ))}
            </div>
            <button className="generate-button" onClick={handleGenerateDrinks}>
              Generate Drinks
            </button>
          </div>
        ) : (
          <p>Drinks</p>
        )}
      </div>
    </div>
  );
}

export default App;
