export const generateRandomLetter = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
};

export const generateLettersGrid = () => {
    return Array.from({ length: 16 }, () => generateRandomLetter());
};
