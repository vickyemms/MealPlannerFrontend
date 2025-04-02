import React from "react";
import { FaFilter } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = ({ selectedItem, onNavClick, onFilterClick }) => (
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
    <FaFilter className="filter-icon" onClick={onFilterClick} />
  </header>
);

export default Navbar;
