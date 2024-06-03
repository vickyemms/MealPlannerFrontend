import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedItem, setSelectedItem] = useState("ingredients");

  const handleNavClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="App">
      <h1 className="title">Bartender</h1>
      <div className="nav-bar">
        <ul className="nav-list">
          <li
            className={`nav-item ${
              selectedItem === "ingredients" ? "active" : ""
            }`}
            onClick={() => handleNavClick("ingredients")}
          >
            Ingredients
          </li>
          <li
            className={`nav-item ${selectedItem === "drinks" ? "active" : ""}`}
            onClick={() => handleNavClick("drinks")}
          >
            Drinks
          </li>
        </ul>
      </div>
      <div className="content">
        {selectedItem === "ingredients" ? <p>Ingredients</p> : <p>Drinks</p>}
      </div>
    </div>
  );
}

export default App;
