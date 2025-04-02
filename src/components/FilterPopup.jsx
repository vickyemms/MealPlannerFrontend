import React, { useState, useEffect } from "react";
import "../styles/Popup.css";
import "../styles/FilterPopup.css";

const FilterPopup = ({ filters, onClose, onApply, onClear }) => {
  const [selectedCuisine, setSelectedCuisine] = useState(new Set());
  const [selectedProtein, setSelectedProtein] = useState(new Set());
  const [selectedHealthiness, setSelectedHealthiness] = useState(new Set());

  useEffect(() => {
    setSelectedCuisine(new Set(filters.cuisine));
    setSelectedProtein(new Set(filters.protein));
    setSelectedHealthiness(new Set(filters.healthiness));
  }, [filters]);

  const handleCheckboxChange = (filterType, value) => {
    const updateSet = (set) => {
      const updatedSet = new Set(set);
      updatedSet.has(value) ? updatedSet.delete(value) : updatedSet.add(value);
      return updatedSet;
    };

    if (filterType === "cuisine") {
      setSelectedCuisine((prevSet) => updateSet(prevSet));
    } else if (filterType === "protein") {
      setSelectedProtein((prevSet) => updateSet(prevSet));
    } else if (filterType === "healthiness") {
      setSelectedHealthiness((prevSet) => updateSet(prevSet));
    }
  };

  const handleApply = () => {
    onApply({
      cuisine: selectedCuisine,
      protein: selectedProtein,
      healthiness: selectedHealthiness,
    });
  };

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
              <input
                type="checkbox"
                name="cuisine"
                value={cuisine}
                checked={selectedCuisine.has(cuisine)}
                onChange={() => handleCheckboxChange("cuisine", cuisine)}
              />
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
              <input
                type="checkbox"
                name="protein"
                value={protein}
                checked={selectedProtein.has(protein)}
                onChange={() => handleCheckboxChange("protein", protein)}
              />
              {protein}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3>Healthiness</h3>
          {["Healthy", "Neutral", "Unhealthy"].map((healthiness) => (
            <label key={healthiness}>
              <input
                type="checkbox"
                name="healthiness"
                value={healthiness}
                checked={selectedHealthiness.has(healthiness)}
                onChange={() =>
                  handleCheckboxChange("healthiness", healthiness)
                }
              />
              {healthiness}
            </label>
          ))}
        </div>

        <div className="popup-buttons-container">
          <button className="popup-button" onClick={onClose}>
            Cancel
          </button>
          <button className="popup-button" onClick={handleApply}>
            Apply
          </button>
          <button className="popup-button" onClick={onClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
