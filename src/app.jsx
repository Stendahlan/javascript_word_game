import { useGameState } from "./useGameState";
import GameGrid from "./GameGrid";
import { useState } from "react";
    
function App() {
    const { 
        letters, 
        gameStarted, 
        gameEnded, 
        formattedTime, 
        handleStart, 
        backToMain 
    } = useGameState();

    const [currentWord, setCurrentWord] = useState('');
    const [isWordValid, setIsWordValid] = useState(null);
    const [score, setScore] = useState(0);
    const [foundWords, setFoundWords] = useState(new Set());

    const handleWordChange = (word, isValid) => {
        setCurrentWord(word);
        setIsWordValid(isValid);
    };

    const handleWordComplete = (word, wordScore) => {
        if (word.length > 1 && !foundWords.has(word.toLowerCase())) {
            setScore(prevScore => prevScore + wordScore);
            setFoundWords(prev => new Set(prev.add(word.toLowerCase())));
        }
    };

    const resetGame = () => {
        setScore(0);
        setFoundWords(new Set());
        setCurrentWord('');
        setIsWordValid(null);
        backToMain();
    };

    const getTextColor = () => {
        if (currentWord.length === 0) return 'text-gray-800'; // Empty
        return isWordValid ? 'text-green-600' : 'text-red-600'; // Valid or invalid
    };

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
                            onClick={resetGame}
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
                                Score: {score}
                            </div>
                            <div className="text-lg font-semibold text-gray-800">
                                Time: {formattedTime}
                            </div>
                        </div>
                        
                        {/* 4X4 Grid component */}
                        <GameGrid 
                            letters={letters} 
                            gameStarted={gameStarted}
                            onWordChange={handleWordChange}
                            onWordComplete={handleWordComplete}
                        />
                        
                        {/* Word display field - only show when game has started */}
                        {gameStarted && (
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={currentWord}
                                    readOnly
                                    className={`px-4 py-2 text-xl font-semibold text-center border-0 rounded bg-transparent w-96 focus:outline-none transition-colors duration-200 ${getTextColor()}`}
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
                                    Start
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