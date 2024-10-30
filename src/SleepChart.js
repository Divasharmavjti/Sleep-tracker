
import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";

function SleepChart({ sleepRecords }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: sleepRecords.map((_, index) => `Day ${index + 1}`),
          datasets: [
            {
              label: "Sleep Duration (hours)",
              data: sleepRecords.map((record) => record.duration),
              borderColor: "rgba(75,192,192,1)",
              fill: false,
            },
          ],
        },
      });


      return () => chartInstance.destroy();
    }
  }, [sleepRecords]);

  return (
    <div>
      <h2>Sleep Duration Chart</h2>
      <canvas ref={chartRef} />
    </div>
  );
}

export default SleepChart;
