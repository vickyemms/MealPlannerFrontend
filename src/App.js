import React, { useState } from "react";
import "./App.css";

function App() {
  const alcohols = [
    "Vodka",
    "Whiskey",
    "Rum",
    "Gin",
    "Tequila",
    "Beer",
    "Cider",
    "White Wine",
    "Red Wine",
    "Rose Wine",
    "Champagne",
  ];

  const [selectedAlcohols, setSelectedAlcohols] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedAlcohols([...selectedAlcohols, name]);
    } else {
      setSelectedAlcohols(
        selectedAlcohols.filter((alcohol) => alcohol !== name)
      );
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Bartender</h1>
        <p>Please click on the alcohol you have at home.</p>
        <div className="checkbox-list">
          {alcohols.map((alcohol) => (
            <div key={alcohol} className="checkbox-item">
              <input
                type="checkbox"
                id={alcohol}
                name={alcohol}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={alcohol}>{alcohol}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
