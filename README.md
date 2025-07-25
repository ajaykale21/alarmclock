# 🎮 Advanced Tic Tac Toe Game

A feature-rich, modern implementation of the classic Tic Tac Toe game with advanced AI, multiple game modes, and stunning visual effects.

## 🚀 Features

### 🎯 Game Modes
- **Player vs Player (PvP)**: Classic two-player mode
- **Player vs Computer (PvC)**: Challenge AI opponents with multiple difficulty levels

### 🤖 AI Difficulty Levels
- **Easy**: Random moves for beginners
- **Medium**: Mix of strategic and random moves
- **Hard**: Strategic gameplay with blocking and winning moves
- **Impossible**: Minimax algorithm with alpha-beta pruning (unbeatable)

### 📐 Board Sizes
- **3x3**: Classic Tic Tac Toe
- **4x4**: Extended gameplay requiring 4 in a row
- **5x5**: Large board for complex strategies

### 🎨 Visual Features
- **Dark/Light Theme**: Toggle between themes
- **Smooth Animations**: CSS transitions and keyframe animations
- **Particle Background**: Animated floating particles
- **Winning Animations**: Special effects for game completion
- **Responsive Design**: Works on all device sizes

### ⚡ Advanced Gameplay
- **Move Timer**: 30-second time limit per turn
- **Move History**: Track all moves made during the game
- **Undo Function**: Reverse previous moves
- **Hint System**: Get suggestions for optimal moves
- **Pause/Resume**: Pause the game at any time

### 🎵 Audio
- **Sound Effects**: Move, win, and tie sound feedback
- **Web Audio API**: Modern audio implementation

### 💾 Persistence
- **Local Storage**: Save game settings and scores
- **Score Tracking**: Persistent win/loss/tie statistics
- **Settings Memory**: Remember player preferences

### ⌨️ Controls
- **Keyboard Shortcuts**:
  - `Space`: Pause/Resume game
  - `H`: Show hint
  - `U`: Undo last move
  - `N`: New game
  - `Escape`: Close modal or pause

### 🎪 Customization
- **Player Names**: Custom player names
- **Symbol Selection**: Choose from X, O, ★, ♦
- **Theme Switching**: Dark and light modes

## 🛠️ Technical Implementation

### Architecture
- **Object-Oriented Design**: Clean class-based structure
- **Modern JavaScript**: ES6+ features and best practices
- **CSS Grid/Flexbox**: Modern layout techniques
- **CSS Variables**: Dynamic theming system

### AI Algorithms
- **Minimax Algorithm**: Perfect play for impossible difficulty
- **Alpha-Beta Pruning**: Optimized decision tree search
- **Strategic Heuristics**: Center control, corner preference
- **Depth Limiting**: Performance optimization for larger boards

### Performance Features
- **Efficient Rendering**: Minimal DOM manipulation
- **Event Delegation**: Optimized event handling
- **Lazy Loading**: On-demand feature initialization
- **Memory Management**: Proper cleanup and garbage collection

## 🎮 How to Play

1. **Setup**: Choose game mode, board size, and difficulty
2. **Customize**: Set player names and symbols
3. **Play**: Click cells to make moves within the time limit
4. **Win**: Get the required number in a row (3 for 3x3, 4 for larger boards)
5. **Features**: Use hints, undo moves, or pause as needed

## 🏆 Game Rules

### Winning Conditions
- **3x3 Board**: 3 symbols in a row (horizontal, vertical, or diagonal)
- **4x4 Board**: 4 symbols in a row
- **5x5 Board**: 4 symbols in a row (not 5, for balanced gameplay)

### Time Rules
- Each player has 30 seconds per move
- Time automatically switches to the next player when expired
- Timer pauses during game pause

## 🎨 Themes

### Dark Theme (Default)
- Deep purple/blue color scheme
- High contrast for better visibility
- Glowing effects and gradients

### Light Theme
- Clean white/gray color scheme
- Professional appearance
- Subtle shadows and borders

## 📱 Responsive Design

- **Desktop**: Full-featured experience with all controls
- **Tablet**: Optimized layout for touch interaction
- **Mobile**: Compact design with essential features
- **Accessibility**: High contrast mode and reduced motion support

## 🔧 Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Features Used**:
  - CSS Grid and Flexbox
  - CSS Custom Properties
  - Web Audio API
  - Local Storage
  - ES6+ JavaScript

## 🚀 Installation

1. Clone or download the repository
2. Open `index.html` in a modern web browser
3. No additional setup required - runs entirely in the browser

## 📁 File Structure

```
tic-tac-toe/
├── index.html          # Main HTML structure
├── style.css           # Complete styling and animations
├── script.js           # Game logic and AI implementation
└── README.md          # This documentation
```

## 🎯 Future Enhancements

- **Multiplayer Online**: Real-time multiplayer support
- **Tournament Mode**: Bracket-style competitions
- **Custom Board Shapes**: Hexagonal, circular boards
- **Advanced AI**: Neural network-based opponents
- **Achievement System**: Unlock rewards and badges
- **Game Replays**: Save and review game history

## 🐛 Known Issues

- Audio may require user interaction to start (browser security)
- Service Worker registration is optional and may not work on all servers

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests.

---

**Enjoy playing Advanced Tic Tac Toe!** 🎉



