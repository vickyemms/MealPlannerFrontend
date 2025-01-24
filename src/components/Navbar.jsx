import React from "react";

const Navbar = ({ selectedItem, onNavClick }) => (
  <header>
    <h1 className="logo">Meal Planner</h1>
    <nav className="nav-bar">
      <ul className="nav-list">
        <li
          className={`nav-item ${
            selectedItem === "ingredients" ? "active" : ""
          }`}
          onClick={() => onNavClick("ingredients")}
        >
          Recipes
        </li>
        <li
          className={`nav-item ${selectedItem === "drinks" ? "active" : ""}`}
          onClick={() => onNavClick("drinks")}
        >
          Grocery List
        </li>
      </ul>
    </nav>
    <h1>Search</h1>
  </header>
);

export default Navbar;
