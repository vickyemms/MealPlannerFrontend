import React from "react";

const GroceryList = ({ groceryList, onClearList }) => (
  <div className="grocery-list">
    {groceryList.length > 0 ? (
      <div>
        <h2 className="grocery-list-header">Grocery List</h2>
        <ul className="grocery-list-item">
          {groceryList.map((item) => (
            <li key={item.id}>
              {item.amount} {item.unit} {item.name}
            </li>
          ))}
        </ul>
        <button onClick={onClearList}>Clear List</button>
      </div>
    ) : (
      <div className="empty">
        <h2>Haven't added any ingredients yet</h2>
      </div>
    )}
  </div>
);

export default GroceryList;
