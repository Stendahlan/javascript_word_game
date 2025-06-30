import React from 'react';
import { useGridInteraction } from './useGridInteraction';
import { useDictionary } from './useDictionary';

function GameGrid({ letters, gameStarted, onWordChange }) {
    
    const { isValidWord, isLoading, error } = useDictionary();
    
    const handleWordComplete = (wordIndices) => {
        const word = wordIndices.map(index => letters[index]).join('');
        const isValid = word.length > 1 && isValidWord(word);
        
        if (onWordChange) {
            onWordChange(word, isValid);
        }
    };
    
    const { highlightedSquares, currWord, handleMouseDown, handleMouseEnter } = useGridInteraction(16, handleWordComplete);
    const currentWord = currWord.map(index => letters[index]).join('');
    const isCurrentWordValid = currentWord.length > 1 && isValidWord(currentWord);

    React.useEffect(() => {
        if (onWordChange) {
            onWordChange(currentWord, isCurrentWordValid);
        }
    }, [currentWord, isCurrentWordValid, onWordChange]);

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