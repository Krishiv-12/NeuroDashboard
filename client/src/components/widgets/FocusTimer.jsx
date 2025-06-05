import { useEffect, useState } from "react";

const FocusTimer = () => {
  const [inputMinutes, setInputMinutes] = useState(25); // Default input
  const [seconds, setSeconds] = useState(0 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Format seconds to MM:SS
  const formatTime = () => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Timer effect
  useEffect(() => {
    let interval;
  
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }
  
    if (isRunning && seconds === 0) {
      setIsRunning(false);
      logPomodoro(); // ✅ Log the session on complete
      alert("🎉 Focus session complete! Logged successfully.");
    }
  
    return () => clearInterval(interval);
  }, [isRunning, seconds]);
  

  // Handle manual minute input
  const handleSetTime = () => {
    const total = parseInt(inputMinutes) * 60;
    if (!isNaN(total) && total > 0) {
      setSeconds(total);
    }
  };

  // Reset logic
  const handleReset = () => {
    setSeconds(inputMinutes * 60);
    setIsRunning(false);
  };

  const logPomodoro = (minutes = inputMinutes) => {
    const logs = JSON.parse(localStorage.getItem("pomodoro_logs")) || [];
    logs.push({ timestamp: new Date().toISOString(), minutes: parseInt(minutes) });
    localStorage.setItem("pomodoro_logs", JSON.stringify(logs));
  };
  

  return (
    <div className="bg-white dark:bg-slate-300 p-6 rounded-xl shadow-md flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-4">🧠 Focus Timer</h3>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="number"
          min="1"
          value={inputMinutes}
          disabled={isRunning}
          onChange={(e) => setInputMinutes(e.target.value)}
          className="w-20 p-2 border border-gray-300 rounded text-center"
        />
        <button
          onClick={handleSetTime}
          disabled={isRunning}
          className="bg-blue-500 transition-all duration-200 hover:scale-105 hover:bg-green-500 text-white px-3 py-1 rounded"
        >
          Set
        </button>
      </div>

      <p className="text-5xl font-mono mb-6">{formatTime()}</p>

      <div className="flex gap-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="bg-green-500 transition-all duration-200 hover:scale-105 hover:bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;
