import { useState, useEffect, useRef } from 'react';
import { generateLettersGrid } from './logic';

export const useGameState = () => {
    const [letters, setLetters] = useState(Array(16).fill(''));
    const [gameStarted, setGameStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const [gameEnded, setGameEnded] = useState(false);
    const timerRef = useRef(null);

    const handleStart = () => {
        setLetters(generateLettersGrid());
        setGameStarted(true);
        setGameEnded(false);
        setTimeLeft(10);
        
        // start countdown timer
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    // Game ends when timer reaches 0
                    setGameEnded(true);
                    setGameStarted(false);
                    clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);
    
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${secs.toString().padStart(2, '0')}`;
    };

    const backToMain = () => {
        setGameEnded(false);
        setGameStarted(false);
        setLetters(Array(16).fill(''));  // This clears all letters
        setTimeLeft(10);  // Also reset the timer
    };

    return {
        letters,
        gameStarted,
        gameEnded,
        timeLeft,
        formattedTime: formatTime(timeLeft),
        handleStart,
        backToMain
    };
};