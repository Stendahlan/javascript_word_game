import { useState, useEffect } from 'react';
import { DICTIONARY } from './dictionary.js';

export const useDictionary = () => {
    const [dictionary, setDictionary] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            // Convert to lowercase and create Set
            const words = DICTIONARY.map(word => word.toLowerCase());
            setDictionary(new Set(words));
            setError(null);
        } catch (err) {
            console.error('Failed to load dictionary:', err);
            setError('Failed to load dictionary');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const isValidWord = (word) => {
        if (!word || typeof word !== 'string') return false;
        return dictionary.has(word.toLowerCase().trim());
    };

    return {
        isValidWord,
        isLoading,
        error
    };
};