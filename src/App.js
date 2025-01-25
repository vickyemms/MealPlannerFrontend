import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Recipes from "./components/Recipes";
import GroceryList from "./components/GroceryList";

function App() {
  const [selectedItem, setSelectedItem] = useState("recipes");
  const [recipes, setRecipes] = useState([]);
  const [groceryList, setGroceryList] = useState([]);

  const handleNavClick = (item) => {
    setSelectedItem(item);
  };

  const handleFetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:8080/recipes");
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
  };

  useEffect(() => {
    handleFetchRecipes();
  }, []);

  const handleAddToGroceryList = (recipe) => {
    // Implementation will be added later
  };

  // Empty method to clear the grocery list
  const handleClearList = () => {
    // Implementation will be added later
  };

  return (
    <div className="App">
      <Navbar selectedItem={selectedItem} onNavClick={handleNavClick} />
      <main>
        <div className="main-content">
          {selectedItem === "recipes" ? (
            <Recipes
              recipes={recipes}
              onAddToGroceryList={handleAddToGroceryList}
            />
          ) : (
            <GroceryList
              groceryList={groceryList}
              onClearList={handleClearList}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
