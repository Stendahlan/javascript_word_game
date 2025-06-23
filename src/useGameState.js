import { useState } from 'react';
import { generateLettersGrid } from './logic';

export const useGameState = () => {
    const [letters, setLetters] = useState(Array(16).fill(''));
    const [gameStarted, setGameStarted] = useState(false);

    const handleStart = () => {
        const newLetters = generateLettersGrid();
        setLetters(newLetters);
        setGameStarted(true);
    };

    return {
        letters,
        gameStarted,
        handleStart
    };
};