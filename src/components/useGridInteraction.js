import { useState, useEffect } from 'react';

// helper function to determine if it's adjacent
const isAdjacent = (index1, index2, gridSize = 4) => {
    // If it's the same square, it's not "adjacent" for new highlighting
    if (index1 === index2) return false;

    const row1 = Math.floor(index1 / gridSize);
    const col1 = index1 % gridSize;
    const row2 = Math.floor(index2 / gridSize);
    const col2 = index2 % gridSize;

    const rowDiff = Math.abs(row1 - row2);
    const colDiff = Math.abs(col1 - col2);

    // Adjacency/Diagonality means row and col differences are 0 or 1
    // (but not both 0, which would mean it's the same square)
    return (rowDiff == 1 && colDiff == 1) || (rowDiff == 0 && colDiff == 1) || (rowDiff == 1 && colDiff == 0);
};

export const useGridInteraction = (gridSize = 16) => {
    // storing indices of currently highlighted squares
    const [highlightedSquares, setHighlightedSquares] = useState(new Set());
    // tracking whether mouse is down (for dragging)
    const [isDragging, setIsDragging] = useState(false);
    // tracking last highligthed square
    const [lastHighlightedIndex, setLastHighlightedIndex] = useState(null);
    
    // when mouse is clicked
    const handleMouseDown = (index) => {
        setIsDragging(true);
        
        setHighlightedSquares(new Set([index]));

        setLastHighlightedIndex(index);
    };
    // when mouse is clicked on a square
    const handleMouseEnter = (index) => {
        if (isDragging) {
            console.log(index)
            console.log(lastHighlightedIndex)
            // check to see if hovered square already in the current highlighted path
            if (highlightedSquares.has(index)) {
                console.log("hovered already in path");
                return;
            }

            // check to see if there is a highlighted square
            if (lastHighlightedIndex === null) {
                console.log("first square");
                return;
            }

            // checking to see if the hovered square is adjacent or diagonal to last highlighted square
            if (isAdjacent(lastHighlightedIndex, index, Math.sqrt(gridSize))) {
                console.log("it IS adjacent");
                // add the new square to the path
                setHighlightedSquares(prev => new Set(prev.add(index)));

                setLastHighlightedIndex(index);
            } else {
                console.log("it IS NOT adjacent");
            }
        }
    };
    // when mouse button is released anywhere
    const handleMouseUp = () => {
        setIsDragging(false);
        setHighlightedSquares(new Set());
        setLastHighlightedIndex(null);
    };
    // comonent mounts
    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return {
        highlightedSquares,
        isDragging,
        handleMouseDown,
        handleMouseEnter
    };
};