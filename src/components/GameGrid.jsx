import React from 'react';
import { useGridInteraction } from './useGridInteraction';

function GameGrid({ letters }) {
    
    const { highlightedSquares, handleMouseDown, handleMouseEnter } = useGridInteraction();

    return (
        <div className="grid grid-cols-4 gap-16 mb-8">
            {letters.map((letter, i) => (
                <div
                    key={i}
                    className={`
                        w-24 h-24 border border-gray-300 flex items-center justify-center
                        ${highlightedSquares.has(i) ? 'bg-blue-500' : 'bg-black'}
                        transition-colors duration-100 ease-in-out cursor-pointer
                    `}
                    onMouseDown={() => handleMouseDown(i)}
                    onMouseEnter={() => handleMouseEnter(i)}
                >
                    <span className="text-white text-2xl font-bold select-none">
                        {letter}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default GameGrid;