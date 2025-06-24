import { useGameState } from "./useGameState";
import GameGrid from "./components/GameGrid";
    
function App() {
    const { letters, gameStarted, handleStart } = useGameState();

    return (
        <div className="min-h-screen bg-gray-100 relative overflow-hidden">
            {/* Game title in upper left */}
            <h1 className="absolute top-8 left-8 text-3xl font-bold text-gray-800">
                WellWorded
            </h1>
            
            {/* Centered container */}
            <div className="min-h-screen flex flex-col items-center justify-center">
                {/* Score and Time above the grid */}
                <div className="flex justify-between w-full max-w-xs mb-4">
                    <div className="text-lg font-semibold text-gray-800">
                        Score: 0
                    </div>
                    <div className="text-lg font-semibold text-gray-800">
                        Time: 00
                    </div>
                </div>
                
                {/* 4X4 Grid component */}
                <GameGrid letters={letters} />
                
                {/* Start button - only show when game hasn't started */}
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
            </div>
        </div>
    )
}

export default App