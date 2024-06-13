import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Ingredients from "./components/Ingredients";
import DrinksList from "./components/DrinksList";

function App() {
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
    const selectedIngredients = Object.keys(ingredients).filter(
      (ingredient) => ingredients[ingredient]
    );

    const drinkPromises = selectedIngredients.map((ingredient) =>
      fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
      ).then((response) => response.json())
    );

    const drinkResults = await Promise.all(drinkPromises);

    const allDrinks = drinkResults.flatMap((result) => result.drinks);
    const uniqueDrinks = Array.from(
      new Set(allDrinks.map((drink) => drink.idDrink))
    ).map((id) => allDrinks.find((drink) => drink.idDrink === id));

    setDrinks(uniqueDrinks);
    handleNavClick("drinks");
  };

  const clearList = () => {
    setDrinks([]);
    setIngredients({
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
    handleNavClick("ingredients");
  };

  return (
    <div className="App">
      <h1 className="title">Bartender</h1>
      <Navbar selectedItem={selectedItem} onNavClick={handleNavClick} />
      <div className="main-content">
        {selectedItem === "ingredients" ? (
          <Ingredients
            ingredients={ingredients}
            onCheckboxChange={handleCheckboxChange}
            onGenerateDrinks={handleGenerateDrinks}
          />
        ) : (
          <DrinksList drinks={drinks} onClearList={clearList} />
        )}
      </div>
    </div>
  );
}

export default App;
