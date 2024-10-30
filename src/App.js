
import React, { useState } from "react";
import SleepForm from "./SleepForm";
import SleepList from "./SleepList";
import SleepChart from "./SleepChart";

function App() {
  const [sleepRecords, setSleepRecords] = useState([]);

  const addSleepRecord = (record) => {
    const duration = calculateDuration(record.sleepTime, record.wakeTime);
    setSleepRecords([...sleepRecords, { ...record, duration }]);
  };

  const calculateDuration = (sleepTime, wakeTime) => {
    const start = new Date(sleepTime);
    const end = new Date(wakeTime);
    const duration = (end - start) / (1000 * 60 * 60); 
    return duration.toFixed(2);
  };

 
  const handleDelete = (indexToRemove) => {
    setSleepRecords((prevRecords) =>
      prevRecords.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div>
      <h1>Sleep Tracker</h1>
      <SleepForm addSleepRecord={addSleepRecord} />
      <SleepList sleepRecords={sleepRecords} onDelete={handleDelete} />
      <SleepChart sleepRecords={sleepRecords} />
    </div>
  );
}

export default App;
