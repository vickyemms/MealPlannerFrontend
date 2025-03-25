import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Recipes from "./components/Recipes";
import GroceryList from "./components/GroceryList";

function App() {
  const [selectedItem, setSelectedItem] = useState("recipes");
  const [recipes, setRecipes] = useState([]);
  const [groceryList, setGroceryList] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set());

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
    setGroceryList((prevList) => {
      return recipe.ingredients.reduce((newList, ingredient) => {
        const existingItem = newList.find(
          (item) => item.name.toLowerCase() === ingredient.name.toLowerCase()
        );

        if (existingItem) {
          return newList.map((item) =>
            item.name.toLowerCase() === ingredient.name.toLowerCase()
              ? { ...item, amount: item.amount + ingredient.amount }
              : item
          );
        } else {
          return [...newList, { ...ingredient }];
        }
      }, prevList);
    });
  };

  const handleClearList = () => {
    setGroceryList([]);
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevChecked) => {
      const newChecked = new Set(prevChecked);
      newChecked.has(id) ? newChecked.delete(id) : newChecked.add(id);
      return newChecked;
    });
  };

  const handleRemoveCheckedItems = () => {
    setGroceryList((prevList) =>
      prevList.filter((item) => !checkedItems.has(item.id))
    );
    setCheckedItems(new Set());
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
              checkedItems={checkedItems}
              onCheckboxChange={handleCheckboxChange}
              onRemoveCheckedItems={handleRemoveCheckedItems}
              onClearList={handleClearList}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
