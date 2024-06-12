import React from "react";
import Drink from "./Drink";

const DrinksList = ({ drinks }) => (
  <div className="drinks-list">
    {drinks?.length > 0 ? (
      <div>
        {drinks.map((drink) => (
          <Drink key={drink.idDrink} drink={drink} />
        ))}
      </div>
    ) : (
      <div className="empty">
        <h2>No drinks found</h2>
      </div>
    )}
  </div>
);

export default DrinksList;
