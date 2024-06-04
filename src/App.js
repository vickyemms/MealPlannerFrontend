import React, { useState } from "react";
import "./App.css";
import Drink from "./Drink";

function App() {
  const API_URL =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin";

  const [selectedItem, setSelectedItem] = useState("ingredients");
  const [drinks, setDrinks] = useState([]);

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

  const handleGenerateDrinks = async () => {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();

    setDrinks(data.drinks);

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
          <div className="drinks-list">
            {drinks?.length > 0 ? (
              <div>
                {drinks.map((drink) => (
                  <Drink drink={drink} />
                ))}
              </div>
            ) : (
              <div className="empty">
                <h2>No drinks found</h2>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
