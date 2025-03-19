import React from "react";

const GroceryList = ({
  groceryList,
  checkedItems,
  onCheckboxChange,
  onRemoveCheckedItems,
  onClearList,
}) => {
  return (
    <div className="grocery-list">
      {groceryList.length > 0 ? (
        <div>
          <h2 className="grocery-list-header">Grocery List</h2>
          <ul className="grocery-list-item">
            {groceryList.map((item) => (
              <li key={item.id} className="grocery-list-item">
                <input
                  type="checkbox"
                  id={`item-${item.id}`}
                  checked={checkedItems.has(item.id)}
                  onChange={() => onCheckboxChange(item.id)}
                />
                <label htmlFor={`item-${item.id}`}>
                  {item.amount} {item.unit} {item.name}
                </label>
              </li>
            ))}
          </ul>
          <div className="grocery-button-container">
            <button className="grocery-button" onClick={onClearList}>
              Clear
            </button>
            <button className="grocery-button" onClick={onRemoveCheckedItems}>
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="empty">
          <h2>Haven't added any ingredients yet</h2>
        </div>
      )}
    </div>
  );
};

export default GroceryList;
