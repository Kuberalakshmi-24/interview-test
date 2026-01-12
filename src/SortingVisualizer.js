// SortingVisualizer.js
import React, { useState, useEffect } from "react";
import "./SortingVisualizer.css";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [compareIndices, setCompareIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [swapCount, setSwapCount] = useState(0);

  
  const MIN_SIZE = 10;
  const MAX_SIZE = 16;
  const ANIMATION_SPEED_MS = 350; 

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

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setIsSorting(true);
    let tempArray = [...array];
    let n = tempArray.length;
    let count = 0;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCompareIndices([j, j + 1]);
        await sleep(ANIMATION_SPEED_MS);

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
    if (sortedIndices.includes(index)) return "#10b981"; // Vibrant Emerald
    if (compareIndices.includes(index)) return "#f43f5e"; // Vibrant Rose
    return "#6366f1"; 
  };

  return (
    <div className="visualizer-container">
      <div className="header">
        <h1>Bubble Sort Visualizer</h1>
        {/* Updated class for the badge */}
        <div className="stats-badge">
          Swaps Performed: {swapCount}
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

      <div className="controls">
        {/* Added specific classes for button styling */}
        <button className="btn-secondary" onClick={generateArray} disabled={isSorting}>
          Reset Array
        </button>
        <button className="btn-primary" onClick={bubbleSort} disabled={isSorting}>
          Start Sorting
        </button>
      </div>
    </div>
  );
};

export default SortingVisualizer;