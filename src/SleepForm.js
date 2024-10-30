
import React, { useState } from "react";

function SleepForm({ addSleepRecord }) {
  const [sleepTime, setSleepTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addSleepRecord({ sleepTime, wakeTime });
    setSleepTime("");
    setWakeTime("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Sleep Time:
        <input
          type="datetime-local"
          value={sleepTime}
          onChange={(e) => setSleepTime(e.target.value)}
        />
      </label>
      <label>
        Wake Time:
        <input
          type="datetime-local"
          value={wakeTime}
          onChange={(e) => setWakeTime(e.target.value)}
        />
      </label>
      <button type="submit">Add Sleep Record</button>
    </form>
  );
}

export default SleepForm;
