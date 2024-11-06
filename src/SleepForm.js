import React, { useState } from "react";

const SleepForm = ({ addSleepRecord }) => {
  const [sleepTime, setSleepTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addSleepRecord({
      sleepTime,
      wakeTime
    });
    setSleepTime("");
    setWakeTime("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Enter sleep time:</p>
      <input
        type="datetime-local"
        value={sleepTime}
        onChange={(e) => setSleepTime(e.target.value)}
      />

      <p>Enter wake time:</p>
      <input
        type="datetime-local"
        value={wakeTime}
        onChange={(e) => setWakeTime(e.target.value)}
      />

      <button type="submit">Add Record</button>
    </form>
  );
};

export default SleepForm;
