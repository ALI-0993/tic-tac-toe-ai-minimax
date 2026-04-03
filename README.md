# 🎮 Tic Tac Toe with Unbeatable AI

A modern Tic Tac Toe game built using **HTML, CSS, and JavaScript**, featuring an **unbeatable AI powered by the Minimax algorithm with Alpha-Beta Pruning**.

---

## 🚀 Live Features

* 🎯 **Two Game Modes**

  * Player vs Player
  * Player vs Computer

* 🤖 **3 AI Difficulty Levels**

  * 🟢 Easy — Random moves
  * 🟡 Medium — Smart (win/block logic)
  * 🔴 Hard — Unbeatable AI (Minimax + Alpha-Beta Pruning)

* 🧠 **Advanced AI**

  * Implements **Minimax algorithm**
  * Optimized using **Alpha-Beta pruning**
  * Uses **depth-based scoring** for smarter decisions

* 💾 **Persistent Game State**

  * Game resumes after page refresh
  * Saves:

    * Board state
    * Current player
    * Game mode
    * Difficulty level

* ✨ **Enhanced UI/UX**

  * Winning cells highlight
  * Responsive design for all devices
  * Smooth interactions

---

## 🧠 How the AI Works

The AI uses the **Minimax algorithm**, a recursive decision-making algorithm that:

* Simulates all possible game outcomes
* Assumes the opponent plays optimally
* Chooses the move that maximizes its chances of winning

### ⚡ Optimization: Alpha-Beta Pruning

To improve performance, Alpha-Beta pruning is used to:

* Skip unnecessary calculations
* Reduce time complexity
* Maintain optimal decision-making

### 🎯 Scoring Strategy

```js
if (result === "O") return 10 - depth;
if (result === "X") return depth - 10;
return 0;
```

* Faster wins are prioritized
* Losses are delayed strategically

---

## 🛠️ Tech Stack

* **HTML5**
* **CSS3**
* **Vanilla JavaScript (ES6+)**

---

## 📂 Project Structure

```
tic-tac-toe-ai/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🎮 How to Play

1. Select game mode (PvP or vs Computer)
2. Choose difficulty level
3. Click on any cell to make a move
4. Try to beat the AI on **Hard mode (you can't 😉)**

---

## 🚀 Future Improvements

* 🎵 Sound effects
* 🎯 Score tracking system
* ✨ Winning line animation
* 🌐 Online multiplayer mode
* 🧠 AI thinking animation

---

## 📚 Key Learnings

This project demonstrates:

* Recursion and backtracking
* Game tree exploration
* Algorithm optimization techniques
* State management using localStorage
* DOM manipulation and event handling

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and improve it.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## ⭐ Final Note

This project is not just a simple Tic Tac Toe game —
it showcases **algorithmic problem solving and optimized decision-making in JavaScript**.

If you found this useful, consider giving it a ⭐ on GitHub!