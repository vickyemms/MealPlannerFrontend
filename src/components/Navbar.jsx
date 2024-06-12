import React from "react";

const Navbar = ({ selectedItem, onNavClick }) => (
  <div className="nav-bar">
    <ul className="nav-list">
      <li
        className={`nav-item ${selectedItem === "ingredients" ? "active" : ""}`}
        onClick={() => onNavClick("ingredients")}
      >
        Ingredients
      </li>
      <li
        className={`nav-item ${selectedItem === "drinks" ? "active" : ""}`}
        onClick={() => onNavClick("drinks")}
      >
        Drinks
      </li>
    </ul>
  </div>
);

export default Navbar;
