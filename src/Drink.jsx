import React from "react";

const Drink = ({ drink }) => {
  return (
    <div className="drink">
      <div>
        <img src={drink.strDrinkThumb} alt={drink.strDrink} />
      </div>
      <div>
        <p className="drink-name">{drink.strDrink}</p>
      </div>
    </div>
  );
};

export default Drink;
