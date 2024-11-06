import React, { useState } from "react";
import SleepForm from "./SleepForm";
import SleepList from "./SleepList";
import SleepChart from "./SleepChart";
import './App.css';

const App = () => {
  const [sleepRecords, setSleepRecords] = useState([]);
  const [age, setAge] = useState("");

  // Function to calculate sleep duration in hours and minutes
  const calculateDuration = (sleep, wake) => {
    const sleepDate = new Date(sleep);
    const wakeDate = new Date(wake);
    let diff = wakeDate - sleepDate;

    // Handle case where wake time is the next day
    if (diff < 0) {
      diff += 24 * 60 * 60 * 1000;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes, totalHours: hours + minutes / 60 }; // totalHours for chart data
  };

  const analyzeSleep = (totalHours) => {
    if (totalHours >= 7 && totalHours <= 9) {
      return 'Good sleep duration!';
    } else if (totalHours < 7) {
      return 'Try to get more sleep. Recommended: 7-9 hours.';
    } else {
      return 'You had a long sleep. Aim for 7-9 hours.';
    }
  };

  const addSleepRecord = (record) => {
    const duration = calculateDuration(record.sleepTime, record.wakeTime);
    setSleepRecords([...sleepRecords, { ...record, duration }]);
  };

  const handleDelete = (indexToRemove) => {
    setSleepRecords((prevRecords) =>
      prevRecords.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div>
      <h1>SLEEP TRACKER</h1>
      <p>Enter your age:</p>
      <input 
      
        type="number" 
        placeholder="Enter here" 
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <SleepForm addSleepRecord={addSleepRecord} />
      <SleepList 
        sleepRecords={sleepRecords} 
        onDelete={handleDelete} 
        analyzeSleep={analyzeSleep} 
      />
      <SleepChart sleepRecords={sleepRecords} />
    </div>
  );
};

export default App;
