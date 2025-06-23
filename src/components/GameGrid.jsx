function GameGrid({ letters }) {
    return (
        <div className="grid grid-cols-4 gap-2 mb-8">
            {Array.from({ length: 16 }, (_, i) => (
                <div
                    key={i}
                    className="w-24 h-24 bg-black border border-gray-300 flex items-center justify-center"
                >
                    <span className="text-white text-2xl font-bold">
                        {letters[i]}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default GameGrid;