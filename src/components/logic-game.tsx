"use client";

import { useState } from "react";
import { Check, RotateCcw, Play, ArrowUp, Star, AlertCircle } from "lucide-react";

// --- Game Constants ---
type Direction = 'North' | 'South' | 'East' | 'West';
type Command = 'Forward' | 'Turn Left' | 'Turn Right';
type GameStatus = 'idle' | 'running' | 'success' | 'failure';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 5;
const START_POSITION: Position = { x: 0, y: 4 };
const GOAL_POSITION: Position = { x: 4, y: 0 };
const OBSTACLES: Position[] = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 1, y: 3 },
  { x: 3, y: 1 },
];

const DIRECTION_MAP: Record<Direction, { dx: number; dy: number; rotate: string }> = {
  North: { dx: 0, dy: -1, rotate: 'rotate-0' },
  East: { dx: 1, dy: 0, rotate: 'rotate-90' },
  South: { dx: 0, dy: 1, rotate: 'rotate-180' },
  West: { dx: -1, dy: 0, rotate: '-rotate-90' },
};

const DIRECTION_ORDER: Direction[] = ['North', 'East', 'South', 'West'];

export function LogicGame() {
  // --- State ---
  const [position, setPosition] = useState<Position>(START_POSITION);
  const [direction, setDirection] = useState<Direction>('North');
  const [commandQueue, setCommandQueue] = useState<Command[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('idle');
  const [feedback, setFeedback] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(-1);

  // --- Game Logic ---
  const addCommand = (cmd: Command) => {
    if (gameStatus === 'running') return;
    setCommandQueue((prev) => [...prev, cmd]);
  };

  const resetGame = () => {
    setPosition(START_POSITION);
    setDirection('North');
    setCommandQueue([]);
    setGameStatus('idle');
    setFeedback("");
    setCurrentStep(-1);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const executeProgram = async () => {
    if (commandQueue.length === 0) {
      setFeedback("Add some instructions first!");
      return;
    }

    setGameStatus('running');
    setFeedback("");

    let currentPos = { ...START_POSITION };
    let currentDir = 'North' as Direction;

    for (let i = 0; i < commandQueue.length; i++) {
      setCurrentStep(i);
      const cmd = commandQueue[i];

      if (cmd === 'Forward') {
        const move = DIRECTION_MAP[currentDir];
        const nextPos = { x: currentPos.x + move.dx, y: currentPos.y + move.dy };

        // Check boundaries
        if (nextPos.x < 0 || nextPos.x >= GRID_SIZE || nextPos.y < 0 || nextPos.y >= GRID_SIZE) {
          setGameStatus('failure');
          setFeedback("Tobi wandered off the map! Let's keep him on the path.");
          return;
        }

        // Check obstacles
        if (OBSTACLES.some(obs => obs.x === nextPos.x && obs.y === nextPos.y)) {
          setGameStatus('failure');
          setFeedback("Oops! Tobi bumped into something. Can you find a different path?");
          return;
        }

        currentPos = nextPos;
      } else if (cmd === 'Turn Left') {
        const idx = DIRECTION_ORDER.indexOf(currentDir);
        currentDir = DIRECTION_ORDER[(idx + 3) % 4];
      } else if (cmd === 'Turn Right') {
        const idx = DIRECTION_ORDER.indexOf(currentDir);
        currentDir = DIRECTION_ORDER[(idx + 1) % 4];
      }

      setPosition({ ...currentPos });
      setDirection(currentDir);
      await sleep(600);

      // Check for early success
      if (currentPos.x === GOAL_POSITION.x && currentPos.y === GOAL_POSITION.y) {
        setGameStatus('success');
        return;
      }
    }

    // End of program check
    if (currentPos.x === GOAL_POSITION.x && currentPos.y === GOAL_POSITION.y) {
      setGameStatus('success');
    } else {
      setGameStatus('failure');
      setFeedback("Tobi stopped, but he hasn't reached the star yet. Try adding more steps!");
    }
  };

  return (
    <section className="rounded-3xl border border-ink/10 bg-white p-5 shadow-soft sm:p-8" aria-labelledby="logic-heading">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-berry">Computational Thinking</p>
        <h2 id="logic-heading" className="mt-1 font-display text-3xl font-bold">Tobi&apos;s Code Quest</h2>
        <p className="mt-2 leading-7 text-ink/70">Help Tobi reach the star by planning a sequence of moves!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column: Game Board */}
        <div className="flex flex-col items-center justify-center">
          <div
            className="relative grid grid-cols-5 grid-rows-5 gap-2 bg-paper p-3 rounded-2xl border-4 border-ink/5"
            style={{ width: 'min(80vw, 400px)', height: 'min(80vw, 400px)' }}
          >
            {/* Render Grid Cells */}
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
              const x = i % GRID_SIZE;
              const y = Math.floor(i / GRID_SIZE);
              const isGoal = x === GOAL_POSITION.x && y === GOAL_POSITION.y;
              const isObstacle = OBSTACLES.some(obs => obs.x === x && obs.y === y);
              const isStart = x === START_POSITION.x && y === START_POSITION.y;

              return (
                <div
                  key={i}
                  className={`rounded-lg flex items-center justify-center transition-colors duration-300 ${
                    isGoal ? 'bg-mango' : isObstacle ? 'bg-ink/20' : 'bg-white border border-ink/5'
                  }`}
                >
                  {isGoal && <Star size={24} className="text-ink" fill="currentColor" />}
                  {isObstacle && <div className="w-4 h-4 bg-ink rounded-full opacity-20" />}
                  {isStart && <div className="w-2 h-2 bg-berry rounded-full" />}
                </div>
              );
            })}

            {/* Tobi Character */}
            <div
              className={`absolute transition-all duration-500 ease-in-out flex items-center justify-center pointer-events-none ${DIRECTION_MAP[direction].rotate}`}
              style={{
                width: 'calc(20% - 1rem)',
                height: 'calc(20% - 1rem)',
                left: `calc(${position.x * 20}% + 0.5rem)`,
                top: `calc(${position.y * 20}% + 0.5rem)`,
                zIndex: 10
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center bg-berry text-white rounded-lg shadow-md">
                <ArrowUp size={20} />
                {/* Tobi's "eyes" to show front */}
                <div className="absolute top-1 flex gap-1">
                  <div className="w-1 h-1 bg-white rounded-full" />
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Message */}
          <div className={`mt-6 min-h-[3rem] flex items-center justify-center text-center font-bold transition-all ${
            gameStatus === 'success' ? 'text-leaf scale-110' :
            gameStatus === 'failure' ? 'text-coral' : 'text-ink/60'
          }`}>
            {feedback && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-ink/5">
                {gameStatus === 'failure' && <AlertCircle size={18} />}
                <span>{feedback}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="flex flex-col gap-6">
          {/* Program Area */}
          <div className="rounded-3xl bg-sky p-6 shadow-inner">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink/60 mb-4">Your Program</p>
            <div className="flex flex-wrap gap-2 min-h-[80px]">
              {commandQueue.length > 0 ? (
                commandQueue.map((cmd, idx) => (
                  <span
                    key={idx}
                    className={`rounded-full px-3 py-2 text-sm font-bold transition-all border-2 ${
                      currentStep === idx ? 'bg-white border-berry scale-110 shadow-sm' : 'bg-white/60 border-transparent text-ink/70'
                    }`}
                  >
                    {idx + 1}. {cmd}
                  </span>
                ))
              ) : (
                <p className="text-sm text-ink/40 italic">Tap the buttons to build your sequence...</p>
              )}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 grid grid-cols-3 gap-3">
              {(['Forward', 'Turn Left', 'Turn Right'] as Command[]).map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => addCommand(cmd)}
                  disabled={gameStatus === 'running'}
                  className="min-h-12 rounded-full border-2 border-ink/10 bg-white px-4 font-bold text-ink transition-all hover:border-berry hover:bg-sky disabled:opacity-50 focus-visible:outline-4 focus-visible:outline-berry active:scale-95"
                >
                  {cmd}
                </button>
              ))}
            </div>

            <button
              onClick={executeProgram}
              disabled={gameStatus === 'running' || commandQueue.length === 0}
              className="min-h-12 flex items-center justify-center gap-2 rounded-full bg-berry px-6 font-bold text-white transition-all hover:bg-berry/90 disabled:opacity-50 focus-visible:outline-4 focus-visible:outline-berry active:scale-95"
            >
              <Play size={18} fill="currentColor" /> Run
            </button>

            <button
              onClick={resetGame}
              disabled={gameStatus === 'running'}
              className="min-h-12 flex items-center justify-center gap-2 rounded-full border-2 border-ink/20 bg-transparent px-6 font-bold text-ink transition-all hover:bg-ink/5 disabled:opacity-50 focus-visible:outline-4 focus-visible:outline-berry active:scale-95"
            >
              <RotateCcw size={18} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      {gameStatus === 'success' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-paper/80 backdrop-blur-sm">
          <div className="max-w-md rounded-3xl bg-white p-8 shadow-soft border-4 border-leaf text-center animate-in fade-in zoom-in duration-300">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-leaf text-white">
              <Check size={40} strokeWidth={3} />
            </div>
            <h2 className="font-display text-3xl font-bold text-ink">You did it!</h2>
            <p className="mt-4 text-lg leading-7 text-ink/70">
              You planned the steps, tested your idea, and fixed your program. <br/>
              <span className="font-bold text-berry">That&apos;s computational thinking!</span>
            </p>
            <button
              onClick={resetGame}
              className="mt-8 w-full min-h-12 rounded-full bg-berry px-6 font-bold text-white transition-all hover:bg-berry/90"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
