import React from "react";

const Navbar = ({ selectedItem, onNavClick }) => (
  <header>
    <h1 className="logo">Meal Planner</h1>
    <nav className="nav-bar">
      <ul className="nav-list">
        <li
          className={`nav-item ${selectedItem === "recipes" ? "active" : ""}`}
          onClick={() => onNavClick("recipes")}
        >
          Recipes
        </li>
        <li
          className={`nav-item ${
            selectedItem === "groceryList" ? "active" : ""
          }`}
          onClick={() => onNavClick("groceryList")}
        >
          Grocery List
        </li>
      </ul>
    </nav>
    <h1>Filter</h1>
  </header>
);

export default Navbar;
