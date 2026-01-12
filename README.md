# 🫧 Bubble Sort Visualizer

A dynamic and interactive web application built with **React** to visualize the **Bubble Sort algorithm** in action. This project was developed as part of a Frontend Technical Assessment.

It features a custom implementation of the sorting logic without relying on external libraries, complete with animations, theme toggling, and speed controls.

🚀 **Live Demo:** [Click Here to View App](https://interview-test-blue.vercel.app/)

---

## ✨ Features

### Core Requirements
- **Visual Representation:** Vertical bars represent array elements with height corresponding to values.
- **Color Coded States:**
  - 🟦 **Indigo/Blue:** Unsorted / Default state.
  - 🟥 **Red:** Elements currently being compared.
  - 🟩 **Green:** Elements that are fully sorted.
- **Interactive Controls:** Generate new random arrays and start sorting.
- **Algorithm:** Pure implementation of Bubble Sort (Iterative swapping).

### 🌟 Bonus Features Implemented
- **🌓 Dark / Light Mode:** Fully functional theme toggle using CSS variables.
- **⚡ Speed Control:** Adjustable slider to control animation speed (Fast ↔ Slow) in real-time.
- **🔢 Swap Counter:** Real-time tracking of total swaps performed during sorting.
- **🚫 Disable Logic:** Controls are disabled during animation to prevent glitches.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Hooks: `useState`, `useEffect`, `useRef`)
- **Styling:** CSS3 (Flexbox, CSS Variables for theming, Transitions)
- **Deployment:** Vercel
- **Constraint:** No external animation or sorting libraries used.

---

## ⚙️ Algorithm & Logic

This visualizer uses the **Bubble Sort** algorithm:

1. **Comparison:** The algorithm iterates through the array and compares adjacent elements (`arr[j]` and `arr[j+1]`).
   - *Visual:* These two bars turn **Red**.
2. **Swapping:** If the left element is greater than the right element, they are swapped.
   - *Visual:* The heights of the bars are exchanged, and the **Swap Counter** increments.
3. **Iteration:** This process repeats for every element. After each pass, the largest element "bubbles up" to its correct position at the end.
   - *Visual:* The sorted element turns **Green**.
4. **Completion:** The process continues until no more swaps are needed, and the entire array turns Green.

---

## 📦 Getting Started (Run Locally)

Follow these steps to run the project on your local machine:

1. **Clone the repository**
   ```bash
   git clone [https://github.com/Kuberalakshmi-24/interview-test]
