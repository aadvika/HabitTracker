// unused

// src/components/DayTile.jsx
import React, { useState } from 'react';

const DayTile = ({ number }) => {
  const [checkboxes, setCheckboxes] = useState([false, false, false]);

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index]; 
    setCheckboxes(newCheckboxes);
  };

  return (
    <div className="day-tile">
      <div className="checkboxes">
        {checkboxes.map((checked, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleCheckboxChange(index)}
            />
            {/* Empty checkbox with label */}
          </label>
        ))}
      </div>
      <div className="day-number">{number}</div>
    </div>
  );
};

export default DayTile;
