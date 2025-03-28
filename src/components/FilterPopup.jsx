import React from "react";

const FilterPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Filter</h2>

        <div className="filter-section">
          <h3>Cuisine</h3>
          {[
            "Asian",
            "Mexican",
            "Middle Eastern",
            "Mediterranean",
            "Swedish",
            "Hungarian",
            "Italian",
            "American",
          ].map((cuisine) => (
            <label key={cuisine}>
              <input type="checkbox" name="cuisine" value={cuisine} />
              {cuisine}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3>Protein</h3>
          {[
            "Chickpeas",
            "Beans",
            "Lentils",
            "Tofu",
            "Falafel",
            "Soy Protein",
            "Pea Protein",
            "No Protein",
          ].map((protein) => (
            <label key={protein}>
              <input type="checkbox" name="protein" value={protein} />
              {protein}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3>Healthiness</h3>
          {["Healthy", "Neutral", "Unhealthy"].map((healthiness) => (
            <label key={healthiness}>
              <input type="checkbox" name="healthiness" value={healthiness} />
              {healthiness}
            </label>
          ))}
        </div>

        <div className="popup-buttons-container">
          <button className="popup-button" onClick={onClose}>
            Cancel
          </button>
          <button className="popup-button">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
