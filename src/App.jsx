import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [goals, setGoals] = useState(Array.from({ length: 11 }, () => Array(3).fill('')));
  const [checkboxStates, setCheckboxStates] = useState(
    Array.from({ length: 11 }, () => Array.from({ length: 7 }, () => Array(3).fill(false)))
  );

  // Handle login page
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission

    const userData = localStorage.getItem(username);
    if (userData) {
      const { goals: savedGoals, checkboxStates: savedCheckboxStates } = JSON.parse(userData);
      setGoals(savedGoals);
      setCheckboxStates(savedCheckboxStates);
    } else {
      // Since, no existing data for user, start with empty goals
      setGoals(Array.from({ length: 11 }, () => Array(3).fill('')));
      setCheckboxStates(Array.from({ length: 11 }, () => Array.from({ length: 7 }, () => Array(3).fill(false))));
    }

    setIsLoggedIn(true);
  };

  // Save habits to localStorage when either logging out or saving habits
  const handleSaveHabits = () => {
    const userData = { goals, checkboxStates };
    localStorage.setItem(username, JSON.stringify(userData));
    console.log("Saving habits:", userData);
  };

  const handleCheckboxChange = (weekIndex, dayIndex, checkboxIndex) => {
    const updatedCheckboxStates = checkboxStates.map((week) =>
      week.map((day) => [...day])
    );

    updatedCheckboxStates[weekIndex][dayIndex][checkboxIndex] = !updatedCheckboxStates[weekIndex][dayIndex][checkboxIndex];

    setCheckboxStates(updatedCheckboxStates);
  };

  const getTileColor = (weekIndex, dayIndex) => {
    const checkedCount = checkboxStates[weekIndex][dayIndex].filter(checkbox => checkbox).length;

    if (checkedCount === 3) {
      return '#98F991'; // Dark green for three checkboxes checked YAY
    } else if (checkedCount === 2) {
      return '#CFFBB3'; // Green for two checkboxes checked ALMOST
    } else if (checkedCount === 1) {
      return '#FDFFAE'; // Light yellow for one checkbox checked KEEP GOING
    }
    return '#f0f0f0'; // Default color when no checkboxes are checked
  };

  // SHow login page
  if (!isLoggedIn) {
    return (
      <div className="App">
        <h1 className="login-title">Login</h1> {}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }


  // Show the habit tracker
  return (
    <div className="App">
      <h1>Habit Tracker</h1>
      <p className="quote">Small steps, tracked daily, lead to big change.</p>
      <div className="day-labels">
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
        <div>Sunday</div>
      </div>
      <div className="habit-grid">
        {Array.from({ length: 11 }).map((_, weekIndex) => (
          <div className="week-row" key={weekIndex}>
            <div className="goal-tile">
              {Array.from({ length: 3 }).map((_, goalIndex) => (
                <input
                  key={goalIndex}
                  type="text"
                  value={goals[weekIndex][goalIndex]}
                  onChange={(e) => {
                    const updatedGoals = [...goals];
                    updatedGoals[weekIndex][goalIndex] = e.target.value;
                    setGoals(updatedGoals);
                  }}
                  placeholder={`Goal ${goalIndex + 1}`}
                />
              ))}
            </div>
            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <div
                className="day-tile"
                key={dayIndex}
                style={{
                  backgroundColor: getTileColor(weekIndex, dayIndex),
                }}
              >
                <div className="checkboxes">
                  {Array.from({ length: 3 }).map((_, checkboxIndex) => (
                    <input
                      key={checkboxIndex}
                      type="checkbox"
                      checked={checkboxStates[weekIndex][dayIndex][checkboxIndex]}
                      onChange={() => handleCheckboxChange(weekIndex, dayIndex, checkboxIndex)}
                    />
                  ))}
                </div>
                <div className="day-number">{weekIndex * 7 + dayIndex + 1}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleSaveHabits}>Save Habits</button>
    </div>
  );
}

export default App;

