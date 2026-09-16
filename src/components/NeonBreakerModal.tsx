import { useEffect, useRef, useState } from 'react';
import { X, Play, RotateCcw, Volume2, VolumeX, Trophy } from 'lucide-react';

interface NeonBreakerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NeonBreakerModal({ isOpen, onClose }: NeonBreakerModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'won'>('idle');
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = 480);
    const height = (canvas.height = 360);

    // Paddle
    const paddleWidth = 80;
    const paddleHeight = 10;
    let paddleX = (width - paddleWidth) / 2;

    // Ball
    const ballRadius = 6;
    let x = width / 2;
    let y = height - 40;
    let dx = 3.5;
    let dy = -3.5;

    // Bricks
    const brickRowCount = 4;
    const brickColumnCount = 6;
    const brickWidth = 62;
    const brickHeight = 16;
    const brickPadding = 10;
    const brickOffsetTop = 40;
    const brickOffsetLeft = 25;

    const colors = ['#10b981', '#06b6d4', '#6366f1', '#f59e0b'];

    interface Brick {
      x: number;
      y: number;
      status: number;
      color: string;
    }

    const bricks: Brick[][] = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
          x: 0,
          y: 0,
          status: 1,
          color: colors[r % colors.length],
        };
      }
    }

    let currentScore = 0;
    let isRunning = gameState === 'playing';

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = Math.max(0, Math.min(canvas.width - paddleWidth, relativeX - paddleWidth / 2));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (e.touches.length > 0) {
        const relativeX = e.touches[0].clientX - rect.left;
        if (relativeX > 0 && relativeX < canvas.width) {
          paddleX = Math.max(0, Math.min(canvas.width - paddleWidth, relativeX - paddleWidth / 2));
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);

    function collisionDetection() {
      let activeBricks = 0;
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            activeBricks++;
            if (
              x > b.x &&
              x < b.x + brickWidth &&
              y > b.y &&
              y < b.y + brickHeight
            ) {
              dy = -dy;
              b.status = 0;
              currentScore += 10;
              setScore(currentScore);
              setHighScore((prev) => Math.max(prev, currentScore));
            }
          }
        }
      }
      if (activeBricks === 0 && isRunning) {
        setGameState('won');
        isRunning = false;
      }
    }

    function drawBall() {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#34d399';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.closePath();
      ctx.shadowBlur = 0;
    }

    function drawPaddle() {
      if (!ctx) return;
      ctx.beginPath();
      ctx.roundRect(paddleX, height - paddleHeight - 12, paddleWidth, paddleHeight, 5);
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#059669';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.closePath();
      ctx.shadowBlur = 0;
    }

    function drawBricks() {
      if (!ctx) return;
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 3);
            ctx.fillStyle = bricks[c][r].color;
            ctx.shadowColor = bricks[c][r].color;
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.closePath();
            ctx.shadowBlur = 0;
          }
        }
      }
    }

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Subtle grid
      ctx.strokeStyle = '#171717';
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }

      drawBricks();
      drawBall();
      drawPaddle();

      if (isRunning) {
        collisionDetection();

        // Wall collisions
        if (x + dx > width - ballRadius || x + dx < ballRadius) {
          dx = -dx;
        }
        if (y + dy < ballRadius) {
          dy = -dy;
        } else if (y + dy > height - paddleHeight - 14) {
          if (x > paddleX && x < paddleX + paddleWidth) {
            // Angle variation depending on where it hits paddle
            const hitPoint = (x - (paddleX + paddleWidth / 2)) / (paddleWidth / 2);
            dx = hitPoint * 4.5;
            dy = -Math.abs(dy);
          } else if (y + dy > height - ballRadius) {
            setGameState('gameover');
            isRunning = false;
          }
        }

        x += dx;
        y += dy;
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isOpen, gameState]);

  if (!isOpen) return null;

  return (
    <div
      id="neon-breaker-game-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Neon Breaker Game</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Interactive HTML5 Canvas Gaming Experience
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Game Stats Bar */}
        <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">SCORE:</span>
            <span className="text-emerald-400 font-bold text-sm">{score}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-neutral-400">BEST:</span>
            <span className="text-neutral-200 font-bold">{highScore}</span>
          </div>
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-neutral-400 hover:text-neutral-200"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {/* Canvas Area */}
        <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 flex justify-center">
          <canvas
            ref={canvasRef}
            className="w-full max-w-[480px] h-[300px] sm:h-[340px] block cursor-none"
          />

          {gameState !== 'playing' && (
            <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-xs flex flex-col items-center justify-center space-y-4 p-4 text-center">
              {gameState === 'idle' && (
                <>
                  <h4 className="text-xl font-bold text-white">Neon Breaker</h4>
                  <p className="text-xs text-neutral-300 max-w-xs">
                    Move your mouse or slide your finger across the canvas to control the neon paddle!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setScore(0);
                      setGameState('playing');
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start Game</span>
                  </button>
                </>
              )}

              {gameState === 'gameover' && (
                <>
                  <h4 className="text-xl font-bold text-red-400">Game Over</h4>
                  <p className="text-xs text-neutral-300">
                    Final Score: <span className="text-emerald-400 font-bold">{score}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setScore(0);
                      setGameState('playing');
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Play Again</span>
                  </button>
                </>
              )}

              {gameState === 'won' && (
                <>
                  <h4 className="text-xl font-bold text-emerald-400">You Cleared The Grid!</h4>
                  <p className="text-xs text-neutral-300">
                    Excellent reflexes! Final Score: <span className="text-emerald-400 font-bold">{score}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setScore(0);
                      setGameState('playing');
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Play Again</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
          <span>Technologies: HTML5 Canvas • JavaScript Physics • Custom Glow FX</span>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-300 hover:text-white underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
