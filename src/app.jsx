import { useGameState } from "./useGameState";
import GameGrid from "./components/GameGrid";
import { useState } from "react";
    
function App() {
    const { letters, gameStarted, gameEnded, formattedTime, handleStart, backToMain } = useGameState();
    const [currentWord, setCurrentWord] = useState('');

    return (
        <div className="min-h-screen bg-gray-100 relative overflow-hidden">
            {/* Game title in upper left */}
            <h1 className="absolute top-8 left-8 text-3xl font-bold text-gray-800">
                WellWorded
            </h1>
            
            {/* Centered container */}
            <div className="min-h-screen flex flex-col items-center justify-center">
                {/* Game Over Screen */}
                {gameEnded && (
                    <>
                        <div className="text-4xl font-bold text-gray-800 mb-8 text-center">
                            Game Over
                        </div>
                        <button 
                            onClick={backToMain}
                            className="px-16 py-6 bg-black text-white font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Play Again
                        </button>
                    </>
                )}

                {/* Game Screen - only show when game is active or not started */}
                {!gameEnded && (
                    <>
                        {/* Score and Time above the grid */}
                        <div className="flex justify-between w-full max-w-xs mb-4">
                            <div className="text-lg font-semibold text-gray-800">
                                Score: 0
                            </div>
                            <div className="text-lg font-semibold text-gray-800">
                                Time: {formattedTime}
                            </div>
                        </div>
                        
                        {/* 4X4 Grid component */}
                        <GameGrid 
                            letters={letters} 
                            onWordChange={setCurrentWord}
                        />
                        
                        {/* Word display field - only show when game has started */}
                        {gameStarted && (
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={currentWord}
                                    readOnly
                                    className="px-4 py-2 text-xl font-semibold text-center border-0 rounded bg-transparent w-96 focus:outline-none"
                                    placeholder="Drag to form words..."
                                />
                            </div>
                        )}
                        
                        {/* Start button - show when game hasn't started */}
                        {!gameStarted && (
                            <div className="flex justify-center">
                                <button 
                                    onClick={handleStart}
                                    className="px-16 py-6 bg-black text-white font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Play
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default App