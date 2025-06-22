    function App() {return (
        <div className="min-h-screen bg-gray-100 relative overflow-hidden">
            {/* Game title in upper left */}
            <h1 className="absolute top-8 left-8 text-3xl font-bold text-gray-800">
                WellWorded
            </h1>

            {/* Score in upper right */}
            <div className="absolute top-8 right-8 text-xl font-semibold text-gray-800">
                Score: 0
            </div>
            
            {/* Centered container */}
            <div className="min-h-screen flex flex-col items-center justify-center">
                {/* 4x4 Grid */}
                <div className="grid grid-cols-4 gap-2 mb-8">
                    {/* Create 16 black squares */}
                    {Array.from({ length: 16 }, (_, i) => (
                        <div
                            key={i}
                            className="w-24 h-24 bg-black border border-gray-300"
                        />
                    ))}
                </div>
                
                {/* Start button */}
                <div className="flex justify-center">
                    <button className="px-16 py-6 bg-black text-white font-semibold hover:bg-blue-700 transition-colors">
                        Start
                    </button>
                </div>
            </div>
        </div>
    )
    }
    
    export default App