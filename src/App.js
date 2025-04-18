import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./styles/App.css";
import RecipeDetails from "./pages/RecipeDetails";
import Navbar from "./components/Navbar";
import Recipes from "./components/Recipes";
import GroceryList from "./components/GroceryList";
import IngredientPopup from "./components/IngredientPopup";
import FilterPopup from "./components/FilterPopup";

function App() {
  const [selectedItem, setSelectedItem] = useState("recipes");
  const [recipes, setRecipes] = useState([]);

  const [allRecipes, setAllRecipes] = useState([]);
  const [groceryList, setGroceryList] = useState([]);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState(new Set());
  const [filters, setFilters] = useState({
    cuisine: new Set(),
    protein: new Set(),
    healthiness: new Set(),
  });

  const handleNavClick = (item) => {
    setSelectedItem(item);
  };

  const handleFetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:8080/recipes");
      const data = await response.json();
      setRecipes(data);
      setAllRecipes(data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
  };

  useEffect(() => {
    handleFetchRecipes();
  }, []);

  const handleAddOpenPopup = (recipe) => {
    setSelectedRecipe(recipe);
    setIsAddPopupOpen(true);
  };

  const handleIngredientCheckbox = (ingredientName) => {
    setSelectedIngredients((prevSelected) => {
      const updatedSet = new Set(prevSelected);
      updatedSet.has(ingredientName)
        ? updatedSet.delete(ingredientName)
        : updatedSet.add(ingredientName);
      return updatedSet;
    });
  };

  const handleConfirmAddIngredients = () => {
    if (!selectedRecipe) return;

    setGroceryList((prevList) => {
      return selectedRecipe.ingredients.reduce((newList, ingredient) => {
        if (!selectedIngredients.has(ingredient.name)) return newList;

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

    setIsAddPopupOpen(false);
    setSelectedIngredients(new Set());
  };

  const handleFilterClick = () => {
    setIsFilterPopupOpen((prev) => !prev);
  };

  const handleApplyFilter = (selectedFilters) => {
    setFilters({
      cuisine: selectedFilters.cuisine || new Set(),
      protein: selectedFilters.protein || new Set(),
      healthiness: selectedFilters.healthiness || new Set(),
    });

    const filtered = recipes.filter((recipe) => {
      const isCuisineMatch = selectedFilters.cuisine?.size
        ? selectedFilters.cuisine.has(recipe.cuisine)
        : true;
      const isProteinMatch = selectedFilters.protein?.size
        ? selectedFilters.protein.has(recipe.protein)
        : true;
      const isHealthinessMatch = selectedFilters.healthiness?.size
        ? selectedFilters.healthiness.has(recipe.healthiness)
        : true;

      return isCuisineMatch && isProteinMatch && isHealthinessMatch;
    });

    setRecipes(filtered);

    setIsFilterPopupOpen((prev) => !prev);
  };

  const handleClearFilters = () => {
    setFilters({
      cuisine: new Set(),
      protein: new Set(),
      healthiness: new Set(),
    });
    setRecipes(allRecipes);

    setIsFilterPopupOpen((prev) => !prev);
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
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <Navbar
                selectedItem={selectedItem}
                onNavClick={handleNavClick}
                onFilterClick={handleFilterClick}
              />
              <main>
                <div className="main-content">
                  {selectedItem === "recipes" ? (
                    <Recipes
                      recipes={recipes}
                      onAddToGroceryList={handleAddOpenPopup}
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

              {isAddPopupOpen && selectedRecipe && (
                <IngredientPopup
                  recipe={selectedRecipe}
                  selectedIngredients={selectedIngredients}
                  onCheckboxChange={handleIngredientCheckbox}
                  onClose={() => setIsAddPopupOpen(false)}
                  onConfirm={handleConfirmAddIngredients}
                />
              )}

              {isFilterPopupOpen && (
                <FilterPopup
                  filters={filters}
                  onClose={handleFilterClick}
                  onApply={handleApplyFilter}
                  onClear={handleClearFilters}
                />
              )}
            </div>
          }
        />

        <Route
          path="/recipe/:id"
          element={<RecipeDetails recipes={recipes} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
