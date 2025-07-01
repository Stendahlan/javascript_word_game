export const generateRandomLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
};

export const generateLettersGrid = () => {
    return Array.from({ length: 16 }, () => generateRandomLetter());
};

export const getLetterScore = (letter) => {
    const scores = {
        'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1,
        'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1,
        'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10
    };
    return scores[letter.toUpperCase()] || 0;
};

export const calculateWordScore = (word) => {
    return word.split('').reduce((total, letter) => total + getLetterScore(letter), 0);
};
