
import React from "react";
import { FaTrashAlt } from "react-icons/fa";

function SleepList({ sleepRecords, onDelete }) {
  return (
    <div>
      <h2>Sleep Records</h2>
      <ul>
        {sleepRecords.map((record, index) => (
          <li key={index}>
            Slept from {record.sleepTime} to {record.wakeTime} – Duration:{" "}
            {record.duration} hours
            <FaTrashAlt
              style={{ cursor: "pointer", marginLeft: "10px" }}
              onClick={() => onDelete(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SleepList;

