// SortingVisualizer.js
import React, { useState, useEffect, useRef } from "react";
import "./SortingVisualizer.css";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [compareIndices, setCompareIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [swapCount, setSwapCount] = useState(0);
  
  // New States for Bonus Features
  const [theme, setTheme] = useState("light");
  const [speed, setSpeed] = useState(300); // Initial Speed
  const speedRef = useRef(300); // Ref to access latest speed inside async loop

  const MIN_SIZE = 10;
  const MAX_SIZE = 16;

  // Handle Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Handle Speed Change
  const handleSpeedChange = (e) => {
    const newSpeed = Number(e.target.value);
    setSpeed(newSpeed);
    speedRef.current = newSpeed; // Update ref immediately
  };

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const generateArray = () => {
    const newArray = [];
    const size = randomIntFromInterval(MIN_SIZE, MAX_SIZE);
    for (let i = 0; i < size; i++) {
      newArray.push(randomIntFromInterval(20, 95));
    }
    setArray(newArray);
    setSortedIndices([]);
    setCompareIndices([]);
    setSwapCount(0);
  };

  useEffect(() => {
    generateArray();
  }, []);

  // Sleep function using Ref to get real-time speed
  const sleep = () => new Promise((resolve) => setTimeout(resolve, speedRef.current));

  const bubbleSort = async () => {
    setIsSorting(true);
    let tempArray = [...array];
    let n = tempArray.length;
    let count = 0;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCompareIndices([j, j + 1]);
        
        // Dynamic Delay
        await sleep();

        if (tempArray[j] > tempArray[j + 1]) {
          let temp = tempArray[j];
          tempArray[j] = tempArray[j + 1];
          tempArray[j + 1] = temp;
          count++;
          setSwapCount(count);
          setArray([...tempArray]);
        }
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
    }
    setSortedIndices((prev) => [...prev, ...Array.from(Array(n).keys())]);
    setCompareIndices([]);
    setIsSorting(false);
  };

  const getBarColor = (index) => {
    if (sortedIndices.includes(index)) return "#10b981"; // Green
    if (compareIndices.includes(index)) return "#f43f5e"; // Red
    // Check Theme for default bar color
    return theme === "light" ? "#6366f1" : "#818cf8"; 
  };

  return (
    <div className="visualizer-container" data-theme={theme}>
      {/* Theme Toggle Button */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      <div className="header">
        <h1>Bubble Sort Visualizer</h1>
        <div className="stats-badge">
          Swaps: {swapCount}
        </div>
      </div>

      <div className="array-container">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="array-bar"
            style={{
              height: `${value * 3.8}px`,
              backgroundColor: getBarColor(idx),
            }}
          >
            {value}
          </div>
        ))}
      </div>

      <div className="controls-wrapper">
        {/* Speed Slider Control */}
        <div className="speed-control">
          <span>Fast</span>
          <input 
            type="range" 
            min="50" 
            max="1000" 
            step="50"
            value={speed} // Note: Slider Logic reversed in UI (Left=Fast is tricky, so stick to Standard: Left=Slow, Right=Fast?)
            // Let's keep Standard: Low Value (50ms) = Fast, High Value (1000ms) = Slow.
            // Better UX: Let's just label it properly
            onChange={handleSpeedChange} 
            disabled={isSorting}
          />
          <span>Slow</span>
        </div>

        <div className="buttons">
          <button className="btn-secondary" onClick={generateArray} disabled={isSorting}>
            Reset Array
          </button>
          <button className="btn-primary" onClick={bubbleSort} disabled={isSorting}>
            Start Sorting
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;