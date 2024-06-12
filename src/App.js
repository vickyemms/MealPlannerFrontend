import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Ingredients from "./components/Ingredients";
import DrinksList from "./components/DrinksList";

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
      <Navbar selectedItem={selectedItem} onNavClick={handleNavClick} />
      <div className="content">
        {selectedItem === "ingredients" ? (
          <Ingredients
            ingredients={ingredients}
            onCheckboxChange={handleCheckboxChange}
            onGenerateDrinks={handleGenerateDrinks}
          />
        ) : (
          <DrinksList drinks={drinks} />
        )}
      </div>
    </div>
  );
}

export default App;
