// BMICalculator.js
import React, { useState } from 'react';

function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!height || !weight || height <= 0 || weight <= 0) {
      alert("Please enter valid height and weight.");
      return;
    }
      const bmiValue = (weight / ((height / 100) ** 2)).toFixed(2);
      setBmi(bmiValue);    
  };

  const resetInputs = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 24.9) return "Normal weight";
    if (bmi < 29.9) return "Overweight";
    return "Obesity";
  };

   return (
    <div>
      <h1>BMI Calculator</h1>
      <form onSubmit={calculateBMI}>
        <label>
          Height in cm:
          <input
            type="number"
            placeholder="Height in cm"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            aria-label="Height in centimeters"
          />
        </label>
        <label>
          Weight in kg:
          <input
            type="number"
            placeholder="Weight in kg"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            aria-label="Weight in kilograms"
          />
        </label>
        <button type="submit">Calculate BMI</button>
        <button type="button" onClick={resetInputs}>Reset</button>
      </form>
      {bmi && (
        <h2>
          Your BMI is: {bmi} - {getBMICategory(bmi)}
        </h2>
      )}
    </div>
  );
}

export default BMICalculator;
