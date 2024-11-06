import React from "react";


function SleepList({ sleepRecords, onDelete, analyzeSleep }) {
  return (
    <div>
      <h2>Sleep Records</h2>
      <ul>
        {sleepRecords.map((record, index) => {
          // Calculate total hours from duration object
          const totalHours = record.duration.hours + record.duration.minutes / 60;
          const isDanger = totalHours < 7 || totalHours > 9;

          return (
            <li 
              key={index} 
              className="sleep-record" 
              style={{
                padding: "10px", 
                margin: "5px 0", 
                borderRadius: "5px",
                display: "flex",
                alignItems: "center"
              }}
            >
              {isDanger && (
                <span className="danger-indicator"></span>
              )}
              
              <div>
                <p>
                  <strong>Sleep Time:</strong> {new Date(record.sleepTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p>
                  <strong>Wake Time:</strong> {new Date(record.wakeTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p>
                  <strong>Duration:</strong> {record.duration.hours} hrs {record.duration.minutes} mins
                </p>
                {/* Pass totalHours correctly here */}
                <p>{analyzeSleep(totalHours)}</p>
              </div>
              <button onClick={() => onDelete(index)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SleepList;

