// Advanced Tic Tac Toe Game
class TicTacToeGame {
    constructor() {
        this.board = [];
        this.boardSize = 3;
        this.currentPlayer = 1;
        this.gameMode = 'pvp'; // 'pvp' or 'pvc'
        this.aiDifficulty = 'medium';
        this.gameActive = false;
        this.gamePaused = false;
        this.moveHistory = [];
        this.scores = { player1: 0, ties: 0, player2: 0 };
        this.gameStartTime = null;
        this.timer = null;
        this.timeLimit = 30; // seconds per turn
        this.currentTime = this.timeLimit;
        this.players = {
            1: { name: 'Player 1', symbol: 'X' },
            2: { name: 'Player 2', symbol: 'O' }
        };
        this.theme = 'dark';
        this.particles = [];
        
        this.initializeEventListeners();
        this.createParticles();
        this.loadGameState();
    }

    initializeEventListeners() {
        // Theme toggle
        document.getElementById('theme-btn').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Game mode selection
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectGameMode(e.target.dataset.mode);
            });
        });

        // Board size selection
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectBoardSize(parseInt(e.target.dataset.size));
            });
        });

        // AI difficulty selection
        document.querySelectorAll('.diff-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectDifficulty(e.target.dataset.difficulty);
            });
        });

        // Symbol selection
        document.querySelectorAll('.symbol-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectSymbol(parseInt(e.target.dataset.player), e.target.dataset.symbol);
            });
        });

        // Game controls
        document.querySelector('.start-game-btn').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('hint-btn').addEventListener('click', () => {
            this.showHint();
        });

        document.getElementById('undo-btn').addEventListener('click', () => {
            this.undoMove();
        });

        document.getElementById('pause-btn').addEventListener('click', () => {
            this.togglePause();
        });

        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.newGame();
        });

        document.getElementById('back-to-setup-btn').addEventListener('click', () => {
            this.backToSetup();
        });

        // Modal controls
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.playAgain();
        });

        document.getElementById('change-settings-btn').addEventListener('click', () => {
            this.changeSettings();
        });

        // Pause overlay controls
        document.getElementById('resume-btn').addEventListener('click', () => {
            this.togglePause();
        });

        document.getElementById('quit-btn').addEventListener('click', () => {
            this.quitToMenu();
        });

        // Player name inputs
        document.getElementById('player1-name').addEventListener('input', (e) => {
            this.players[1].name = e.target.value || 'Player 1';
        });

        document.getElementById('player2-name').addEventListener('input', (e) => {
            this.players[2].name = e.target.value || 'Player 2';
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }

    selectGameMode(mode) {
        this.gameMode = mode;
        document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        
        const aiDifficultySection = document.querySelector('.ai-difficulty');
        if (mode === 'pvc') {
            aiDifficultySection.style.display = 'block';
            this.players[2].name = 'Computer';
        } else {
            aiDifficultySection.style.display = 'none';
            this.players[2].name = document.getElementById('player2-name').value || 'Player 2';
        }
    }

    selectBoardSize(size) {
        this.boardSize = size;
        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-size="${size}"]`).classList.add('active');
    }

    selectDifficulty(difficulty) {
        this.aiDifficulty = difficulty;
        document.querySelectorAll('.diff-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-difficulty="${difficulty}"]`).classList.add('active');
    }

    selectSymbol(player, symbol) {
        // Ensure symbols are different
        const otherPlayer = player === 1 ? 2 : 1;
        if (this.players[otherPlayer].symbol === symbol) {
            // Swap symbols
            this.players[otherPlayer].symbol = this.players[player].symbol;
            document.querySelector(`[data-player="${otherPlayer}"][data-symbol="${this.players[player].symbol}"]`).classList.add('active');
            document.querySelector(`[data-player="${otherPlayer}"][data-symbol="${symbol}"]`).classList.remove('active');
        }
        
        this.players[player].symbol = symbol;
        document.querySelectorAll(`[data-player="${player}"]`).forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-player="${player}"][data-symbol="${symbol}"]`).classList.add('active');
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.theme);
        
        const themeIcon = document.querySelector('#theme-btn i');
        themeIcon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        this.saveGameState();
    }

    startGame() {
        this.initializeBoard();
        this.currentPlayer = 1;
        this.gameActive = true;
        this.gamePaused = false;
        this.moveHistory = [];
        this.gameStartTime = Date.now();
        
        document.querySelector('.game-setup').style.display = 'none';
        document.querySelector('.game-area').style.display = 'block';
        
        this.createBoard();
        this.updateUI();
        this.startTimer();
        this.saveGameState();
    }

    initializeBoard() {
        this.board = Array(this.boardSize).fill().map(() => Array(this.boardSize).fill(0));
    }

    createBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        gameBoard.className = `game-board size-${this.boardSize}`;
        
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', () => this.makeMove(row, col));
                gameBoard.appendChild(cell);
            }
        }
    }

    makeMove(row, col) {
        if (!this.gameActive || this.gamePaused || this.board[row][col] !== 0) return;

        // Human player move
        this.board[row][col] = this.currentPlayer;
        this.moveHistory.push({ row, col, player: this.currentPlayer });
        
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        cell.textContent = this.players[this.currentPlayer].symbol;
        cell.classList.add('filled', `player${this.currentPlayer}`);
        
        this.playSound('move');
        
        if (this.checkWin(row, col)) {
            this.endGame('win', this.currentPlayer);
            return;
        }
        
        if (this.isBoardFull()) {
            this.endGame('tie');
            return;
        }
        
        this.switchPlayer();
        this.updateUI();
        this.resetTimer();
        
        // AI move if in PvC mode
        if (this.gameMode === 'pvc' && this.currentPlayer === 2) {
            setTimeout(() => {
                if (this.gameActive && !this.gamePaused) {
                    this.makeAIMove();
                }
            }, 500);
        }
    }

    makeAIMove() {
        const move = this.getAIMove();
        if (move) {
            this.makeMove(move.row, move.col);
        }
    }

    getAIMove() {
        switch (this.aiDifficulty) {
            case 'easy':
                return this.getRandomMove();
            case 'medium':
                return this.getMediumMove();
            case 'hard':
                return this.getHardMove();
            case 'impossible':
                return this.getMinimaxMove();
            default:
                return this.getRandomMove();
        }
    }

    getRandomMove() {
        const emptyCells = [];
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }
        return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }

    getMediumMove() {
        // 70% chance to make optimal move, 30% random
        if (Math.random() < 0.7) {
            return this.getHardMove();
        }
        return this.getRandomMove();
    }

    getHardMove() {
        // Try to win first
        const winMove = this.findWinningMove(2);
        if (winMove) return winMove;
        
        // Block opponent from winning
        const blockMove = this.findWinningMove(1);
        if (blockMove) return blockMove;
        
        // Take center if available
        const center = Math.floor(this.boardSize / 2);
        if (this.board[center][center] === 0) {
            return { row: center, col: center };
        }
        
        // Take corners
        const corners = [
            { row: 0, col: 0 },
            { row: 0, col: this.boardSize - 1 },
            { row: this.boardSize - 1, col: 0 },
            { row: this.boardSize - 1, col: this.boardSize - 1 }
        ];
        
        for (const corner of corners) {
            if (this.board[corner.row][corner.col] === 0) {
                return corner;
            }
        }
        
        return this.getRandomMove();
    }

    getMinimaxMove() {
        let bestScore = -Infinity;
        let bestMove = null;
        
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col] === 0) {
                    this.board[row][col] = 2;
                    const score = this.minimax(0, false, -Infinity, Infinity);
                    this.board[row][col] = 0;
                    
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = { row, col };
                    }
                }
            }
        }
        
        return bestMove;
    }

    minimax(depth, isMaximizing, alpha, beta) {
        // Check for terminal states
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col] !== 0 && this.checkWin(row, col)) {
                    return this.board[row][col] === 2 ? 10 - depth : depth - 10;
                }
            }
        }
        
        if (this.isBoardFull()) return 0;
        if (depth > 6) return 0; // Limit depth for performance
        
        if (isMaximizing) {
            let maxScore = -Infinity;
            for (let row = 0; row < this.boardSize; row++) {
                for (let col = 0; col < this.boardSize; col++) {
                    if (this.board[row][col] === 0) {
                        this.board[row][col] = 2;
                        const score = this.minimax(depth + 1, false, alpha, beta);
                        this.board[row][col] = 0;
                        maxScore = Math.max(score, maxScore);
                        alpha = Math.max(alpha, score);
                        if (beta <= alpha) break;
                    }
                }
            }
            return maxScore;
        } else {
            let minScore = Infinity;
            for (let row = 0; row < this.boardSize; row++) {
                for (let col = 0; col < this.boardSize; col++) {
                    if (this.board[row][col] === 0) {
                        this.board[row][col] = 1;
                        const score = this.minimax(depth + 1, true, alpha, beta);
                        this.board[row][col] = 0;
                        minScore = Math.min(score, minScore);
                        beta = Math.min(beta, score);
                        if (beta <= alpha) break;
                    }
                }
            }
            return minScore;
        }
    }

    findWinningMove(player) {
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col] === 0) {
                    this.board[row][col] = player;
                    if (this.checkWin(row, col)) {
                        this.board[row][col] = 0;
                        return { row, col };
                    }
                    this.board[row][col] = 0;
                }
            }
        }
        return null;
    }

    checkWin(row, col) {
        const player = this.board[row][col];
        const size = this.boardSize;
        const winLength = size === 3 ? 3 : (size === 4 ? 4 : 4); // Win condition
        
        // Check horizontal
        let count = 1;
        for (let c = col - 1; c >= 0 && this.board[row][c] === player; c--) count++;
        for (let c = col + 1; c < size && this.board[row][c] === player; c++) count++;
        if (count >= winLength) return true;
        
        // Check vertical
        count = 1;
        for (let r = row - 1; r >= 0 && this.board[r][col] === player; r--) count++;
        for (let r = row + 1; r < size && this.board[r][col] === player; r++) count++;
        if (count >= winLength) return true;
        
        // Check diagonal (top-left to bottom-right)
        count = 1;
        for (let i = 1; row - i >= 0 && col - i >= 0 && this.board[row - i][col - i] === player; i++) count++;
        for (let i = 1; row + i < size && col + i < size && this.board[row + i][col + i] === player; i++) count++;
        if (count >= winLength) return true;
        
        // Check diagonal (top-right to bottom-left)
        count = 1;
        for (let i = 1; row - i >= 0 && col + i < size && this.board[row - i][col + i] === player; i++) count++;
        for (let i = 1; row + i < size && col - i >= 0 && this.board[row + i][col - i] === player; i++) count++;
        if (count >= winLength) return true;
        
        return false;
    }

    isBoardFull() {
        return this.board.every(row => row.every(cell => cell !== 0));
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }

    showHint() {
        if (!this.gameActive || this.gamePaused) return;
        
        const hintMove = this.getHardMove();
        if (hintMove) {
            const cell = document.querySelector(`[data-row="${hintMove.row}"][data-col="${hintMove.col}"]`);
            cell.classList.add('hint');
            setTimeout(() => {
                cell.classList.remove('hint');
            }, 2000);
        }
    }

    undoMove() {
        if (!this.gameActive || this.moveHistory.length === 0) return;
        
        // Undo last move(s)
        const movesToUndo = this.gameMode === 'pvc' ? 2 : 1;
        
        for (let i = 0; i < movesToUndo && this.moveHistory.length > 0; i++) {
            const lastMove = this.moveHistory.pop();
            this.board[lastMove.row][lastMove.col] = 0;
            
            const cell = document.querySelector(`[data-row="${lastMove.row}"][data-col="${lastMove.col}"]`);
            cell.textContent = '';
            cell.classList.remove('filled', 'player1', 'player2');
            
            this.switchPlayer();
        }
        
        this.updateUI();
        this.resetTimer();
    }

    togglePause() {
        if (!this.gameActive) return;
        
        this.gamePaused = !this.gamePaused;
        const pauseOverlay = document.getElementById('pause-overlay');
        
        if (this.gamePaused) {
            pauseOverlay.style.display = 'flex';
            this.stopTimer();
        } else {
            pauseOverlay.style.display = 'none';
            this.startTimer();
        }
        
        document.getElementById('pause-btn').innerHTML = this.gamePaused 
            ? '<i class="fas fa-play"></i> Resume' 
            : '<i class="fas fa-pause"></i> Pause';
    }

    startTimer() {
        this.stopTimer();
        this.timer = setInterval(() => {
            this.currentTime--;
            document.getElementById('timer').textContent = this.currentTime;
            
            if (this.currentTime <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    resetTimer() {
        this.currentTime = this.timeLimit;
        document.getElementById('timer').textContent = this.currentTime;
    }

    timeUp() {
        this.stopTimer();
        // Switch to next player when time runs out
        this.switchPlayer();
        this.updateUI();
        this.resetTimer();
        this.startTimer();
        
        // If it's AI turn and time ran out, make AI move
        if (this.gameMode === 'pvc' && this.currentPlayer === 2) {
            setTimeout(() => {
                if (this.gameActive && !this.gamePaused) {
                    this.makeAIMove();
                }
            }, 500);
        }
    }

    updateUI() {
        // Update current player display
        const currentPlayerText = document.getElementById('current-player-text');
        currentPlayerText.textContent = `${this.players[this.currentPlayer].name}'s turn`;
        
        // Update scoreboard
        document.querySelector('.player1-score .player-name').textContent = this.players[1].name;
        document.querySelector('.player2-score .player-name').textContent = this.players[2].name;
        document.querySelector('.player1-score .score-value').textContent = this.scores.player1;
        document.querySelector('.player2-score .score-value').textContent = this.scores.player2;
        document.querySelector('.ties-score .score-value').textContent = this.scores.ties;
        
        // Update button states
        document.getElementById('undo-btn').disabled = this.moveHistory.length === 0;
        document.getElementById('hint-btn').disabled = this.gameMode === 'pvc' && this.currentPlayer === 2;
    }

    endGame(result, winner = null) {
        this.gameActive = false;
        this.stopTimer();
        
        // Update scores
        if (result === 'win') {
            this.scores[`player${winner}`]++;
            this.highlightWinningCells();
        } else {
            this.scores.ties++;
        }
        
        this.playSound(result === 'win' ? 'win' : 'tie');
        this.saveGameState();
        
        // Show result modal
        setTimeout(() => {
            this.showResultModal(result, winner);
        }, 1000);
    }

    highlightWinningCells() {
        // Find and highlight winning line
        // This is a simplified version - you could make it more sophisticated
        const cells = document.querySelectorAll('.cell.filled');
        cells.forEach(cell => {
            if (cell.classList.contains(`player${this.currentPlayer}`)) {
                cell.classList.add('winning');
            }
        });
    }

    showResultModal(result, winner) {
        const modal = document.getElementById('game-modal');
        const title = document.getElementById('modal-title');
        const message = document.getElementById('modal-message');
        const icon = document.getElementById('result-icon');
        const duration = document.getElementById('game-duration');
        const movesCount = document.getElementById('moves-count');
        
        if (result === 'win') {
            title.textContent = 'Game Over!';
            message.textContent = `🎉 ${this.players[winner].name} wins!`;
            icon.innerHTML = '<i class="fas fa-trophy"></i>';
            icon.className = 'result-icon winner';
        } else {
            title.textContent = 'Game Over!';
            message.textContent = "It's a tie! 🤝";
            icon.innerHTML = '<i class="fas fa-handshake"></i>';
            icon.className = 'result-icon tie';
        }
        
        // Calculate game duration
        const gameTime = Math.floor((Date.now() - this.gameStartTime) / 1000);
        const minutes = Math.floor(gameTime / 60);
        const seconds = gameTime % 60;
        duration.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        movesCount.textContent = this.moveHistory.length;
        
        modal.classList.add('show');
    }

    closeModal() {
        document.getElementById('game-modal').classList.remove('show');
    }

    playAgain() {
        this.closeModal();
        this.newGame();
    }

    changeSettings() {
        this.closeModal();
        this.backToSetup();
    }

    newGame() {
        this.startGame();
    }

    backToSetup() {
        this.gameActive = false;
        this.stopTimer();
        document.querySelector('.game-area').style.display = 'none';
        document.querySelector('.game-setup').style.display = 'block';
    }

    quitToMenu() {
        this.togglePause();
        this.backToSetup();
    }

    handleKeyboard(e) {
        if (!this.gameActive) return;
        
        switch (e.key) {
            case ' ':
                e.preventDefault();
                this.togglePause();
                break;
            case 'h':
                this.showHint();
                break;
            case 'u':
                this.undoMove();
                break;
            case 'n':
                this.newGame();
                break;
            case 'Escape':
                if (document.getElementById('game-modal').classList.contains('show')) {
                    this.closeModal();
                } else {
                    this.togglePause();
                }
                break;
        }
    }

    playSound(type) {
        // Create audio context for sound effects
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        // Simple beep sounds using Web Audio API
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        switch (type) {
            case 'move':
                oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
                break;
            case 'win':
                oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime);
                break;
            case 'tie':
                oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
                break;
        }
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            
            particlesContainer.appendChild(particle);
        }
    }

    saveGameState() {
        const gameState = {
            scores: this.scores,
            theme: this.theme,
            gameMode: this.gameMode,
            boardSize: this.boardSize,
            aiDifficulty: this.aiDifficulty,
            players: this.players
        };
        
        localStorage.setItem('ticTacToeAdvanced', JSON.stringify(gameState));
    }

    loadGameState() {
        const saved = localStorage.getItem('ticTacToeAdvanced');
        if (saved) {
            const gameState = JSON.parse(saved);
            
            this.scores = gameState.scores || this.scores;
            this.theme = gameState.theme || this.theme;
            this.gameMode = gameState.gameMode || this.gameMode;
            this.boardSize = gameState.boardSize || this.boardSize;
            this.aiDifficulty = gameState.aiDifficulty || this.aiDifficulty;
            this.players = { ...this.players, ...gameState.players };
            
            // Apply loaded settings
            document.documentElement.setAttribute('data-theme', this.theme);
            document.querySelector(`[data-mode="${this.gameMode}"]`).classList.add('active');
            document.querySelector(`[data-size="${this.boardSize}"]`).classList.add('active');
            document.querySelector(`[data-difficulty="${this.aiDifficulty}"]`).classList.add('active');
            
            // Update UI elements
            document.getElementById('player1-name').value = this.players[1].name === 'Player 1' ? '' : this.players[1].name;
            document.getElementById('player2-name').value = this.players[2].name === 'Player 2' ? '' : this.players[2].name;
            
            const themeIcon = document.querySelector('#theme-btn i');
            themeIcon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            
            if (this.gameMode === 'pvc') {
                document.querySelector('.ai-difficulty').style.display = 'block';
            }
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToeGame();
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}