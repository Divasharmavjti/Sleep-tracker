import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './WaterBreakReminder.css';

const WaterBreakReminder = () => {
  const [dailyTarget, setDailyTarget] = useState(() =>
    parseFloat(localStorage.getItem('dailyTarget')) || 0 // Initial target set to zero
  );
  const [consumedWater, setConsumedWater] = useState(() =>
    parseFloat(localStorage.getItem('consumedWater')) || 0
  );
  const [hourlyIntake, setHourlyIntake] = useState(0);
  const [startDateTime, setStartDateTime] = useState(() =>
    localStorage.getItem('startDateTime') || "2024-11-10T08:00"
  );
  const [endDateTime, setEndDateTime] = useState(() =>
    localStorage.getItem('endDateTime') || "2024-11-10T20:00"
  );
  const [waterDrunkThisHour, setWaterDrunkThisHour] = useState(0);
  const [exceededTarget, setExceededTarget] = useState(false);
  const [dailyDataHistory, setDailyDataHistory] = useState(() =>
    JSON.parse(localStorage.getItem('dailyDataHistory')) || []
  );

  useEffect(() => {
    calculateHourlyIntake(dailyTarget, startDateTime, endDateTime);
  }, [dailyTarget, startDateTime, endDateTime]);

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem('dailyTarget', dailyTarget);
    localStorage.setItem('consumedWater', consumedWater);
    localStorage.setItem('startDateTime', startDateTime);
    localStorage.setItem('endDateTime', endDateTime);
    localStorage.setItem('dailyDataHistory', JSON.stringify(dailyDataHistory));
  }, [dailyTarget, consumedWater, startDateTime, endDateTime, dailyDataHistory]);

  const handleTargetChange = (e) => {
    const target = e.target.value;
    setDailyTarget(target);
    calculateHourlyIntake(target, startDateTime, endDateTime);
  };

  const handleStartDateTimeChange = (e) => {
    const dateTime = e.target.value;
    setStartDateTime(dateTime);
    calculateHourlyIntake(dailyTarget, dateTime, endDateTime);
  };

  const handleEndDateTimeChange = (e) => {
    const dateTime = e.target.value;
    setEndDateTime(dateTime);
    calculateHourlyIntake(dailyTarget, startDateTime, dateTime);
  };

  const calculateHourlyIntake = (target, start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const hoursInDay = (endDate - startDate) / (1000 * 60 * 60);

    if (hoursInDay <= 0) {
      alert("End time must be after start time!");
      return;
    }

    const intakePerHour = (target * 1000) / hoursInDay;
    setHourlyIntake(intakePerHour);
  };

  const handleDrinkThisHour = (e) => {
    const amount = e.target.value;
    setWaterDrunkThisHour(Number(amount));
  };

  const submitDrinkAmount = () => {
    setConsumedWater((prev) => prev + waterDrunkThisHour);
    setWaterDrunkThisHour(0);
  };

  const handleReset = () => {
    const currentDate = new Date().toLocaleDateString();
    setDailyDataHistory((prevData) => [
      ...prevData,
      {
        date: currentDate,
        target: dailyTarget,
        consumed: consumedWater / 1000,
      },
    ]);

    setConsumedWater(0);
    setDailyTarget(0); // Reset to zero
    setStartDateTime("2024-11-10T08:00");
    setEndDateTime("2024-11-10T20:00");
    calculateHourlyIntake(0, "2024-11-10T08:00", "2024-11-10T20:00");
    setExceededTarget(false);
  };

  useEffect(() => {
    if (consumedWater >= dailyTarget * 1000) {
      setExceededTarget(true);
    } else {
      setExceededTarget(false);
    }
  }, [consumedWater, dailyTarget]);

  const progress = Math.min(consumedWater / (dailyTarget * 1000), 1);

  // Function to handle deleting a history entry
  const deleteHistoryEntry = (index) => {
    const updatedHistory = dailyDataHistory.filter((_, i) => i !== index);
    setDailyDataHistory(updatedHistory);
  };

  return (
    <div className="water-break-reminder">
      <h1>Water Break Reminder</h1>
      <label>
        Daily Target (liters):
        <input
          type="number"
          value={dailyTarget}
          onChange={handleTargetChange}
          min="0.5"
          step="0.1"
        />
      </label>

      <div className="time-inputs">
        <label>
          Start Date & Time:
          <input
            type="datetime-local"
            value={startDateTime}
            onChange={handleStartDateTimeChange}
          />
        </label>
        <label>
          End Date & Time:
          <input
            type="datetime-local"
            value={endDateTime}
            onChange={handleEndDateTimeChange}
          />
        </label>
      </div>

      <div className="hourly-target">
        <strong>Hourly Target: {hourlyIntake.toFixed(0)} ml</strong>
      </div>

      <div className="gauge-container">
        <GaugeChart
          id="water-gauge"
          nrOfLevels={20}
          colors={["#ddd", "#00bcd4"]}
          arcWidth={0.3}
          percent={progress}
          textColor="#333"
        />
      </div>

      <div className="drink-input">
        <label>
          Enter volume of water drunk this hour (ml):
          <input
            type="number"
            value={waterDrunkThisHour}
            onChange={handleDrinkThisHour}
            min="0"
            step="50"
          />
        </label>
        <button onClick={submitDrinkAmount}>Submit</button>
      </div>

      <div className="reset-container">
        <button className="reset-button" onClick={handleReset}>Reset Target</button>
      </div>

      {dailyTarget > 0 && exceededTarget && (
        <div className="exceeded-target-message">
          Great job! TARGET COMPLETED
        </div>
      )}

      <div className="daily-history">
        <h3>Daily Consumption History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Target (Liters)</th>
              <th>Consumed (Liters)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dailyDataHistory.map((data, index) => (
              <tr key={index}>
                <td>{data.date}</td>
                <td>{data.target}</td>
                <td>{data.consumed.toFixed(2)}</td>
                <td>
                  <button onClick={() => deleteHistoryEntry(index)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WaterBreakReminder;
