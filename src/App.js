import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Recipes from "./components/Recipes";
import GroceryList from "./components/GroceryList";
import IngredientPopup from "./components/IngredientPopup";

function App() {
  const [selectedItem, setSelectedItem] = useState("recipes");
  const [recipes, setRecipes] = useState([]);
  const [groceryList, setGroceryList] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState(new Set());

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

  const handleOpenPopup = (recipe) => {
    setSelectedRecipe(recipe);
    setIsPopupOpen(true);
  };

  // Handle checkbox changes
  const handleIngredientCheckbox = (ingredientName) => {
    setSelectedIngredients((prevSelected) => {
      const updatedSet = new Set(prevSelected);
      updatedSet.has(ingredientName)
        ? updatedSet.delete(ingredientName)
        : updatedSet.add(ingredientName);
      return updatedSet;
    });
  };

  // Add selected ingredients to the grocery list
  const handleConfirmAddIngredients = () => {
    if (!selectedRecipe) return;

    setGroceryList((prevList) => {
      return selectedRecipe.ingredients.reduce((newList, ingredient) => {
        if (!selectedIngredients.has(ingredient.name)) return newList; // Only add selected items

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

    // Close popup and reset selected ingredients
    setIsPopupOpen(false);
    setSelectedIngredients(new Set());
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
            <Recipes recipes={recipes} onAddToGroceryList={handleOpenPopup} />
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

      {isPopupOpen && selectedRecipe && (
        <IngredientPopup
          recipe={selectedRecipe}
          selectedIngredients={selectedIngredients}
          onCheckboxChange={handleIngredientCheckbox}
          onClose={() => setIsPopupOpen(false)}
          onConfirm={handleConfirmAddIngredients}
        />
      )}
    </div>
  );
}

export default App;
