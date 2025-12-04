import React, { useEffect, useState } from "react";

export default function WorkInProgress() {
  const [progress, setProgress] = useState(0);

  // Simple JS animation for progress bar
  useEffect(() => {
    let start = 0;
    const end = 70; // set your real progress here
    const speed = 20;

    const timer = setInterval(() => {
      start += 1;
      setProgress(start);
      if (start === end) clearInterval(timer);
    }, speed);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pt-15 flex items-center justify-center">
      <div className="bg-gray-800 shadow-xl border border-gray-700 rounded-2xl p-10 max-w-xl w-full text-center">
        
        {/* Icon */}
        <div className="text-5xl mb-4 text-yellow-400 animate-bounce">
          🚧
        </div>

        {/* Title */}
        <h1 className="text-3xl text-white font-bold mb-2">
          Work in Progress
        </h1>

        {/* Description */}
        <p className="text-gray-300 mb-6">
          We're working hard to bring this page to life. Stay tuned!
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden mb-3">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"
          ></div>
        </div>

        <p className="text-gray-400 text-sm mb-6">
          Progress: <span className="text-white font-semibold">{progress}%</span>
        </p>

        {/* Coming Features */}
        <div className="text-left mb-6">
          <h2 className="text-white font-semibold mb-3">What's Coming:</h2>
          <ul className="text-gray-300 space-y-2">
            <li>• Fully responsive UI</li>
            <li>• Smooth interactions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
