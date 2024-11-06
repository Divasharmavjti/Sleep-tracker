import React, { useState } from 'react';
import './SleepForm.css';

function SleepForm({ addSleepRecord }) {
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [age, setAge] = useState(''); // Add state for age

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    const sleepDateTime = `${today}T${sleepTime}`;
    const wakeDateTime = `${today}T${wakeTime}`;
  
    addSleepRecord({
      sleepTime: sleepDateTime,
      wakeTime: wakeDateTime,
      age
    });
  
    // Reset fields
    setSleepTime('');
    setWakeTime('');
    setAge('');
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="sleep-form">
      <label>Sleep Time</label>
      <input
        type="time"
        value={sleepTime}
        onChange={(e) => setSleepTime(e.target.value)}
        required
      />
      <label>Wake Time</label>
      <input
        type="time"
        value={wakeTime}
        onChange={(e) => setWakeTime(e.target.value)}
        required
      />
      {/* <label>Age</label> New Age Input */}
      {/* <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
        min="0" // Optional: Set a minimum value
      /> */}
      <button type="submit">Add Sleep Record</button>
    </form>
  );
}

export default SleepForm;
