export const randomNumber = (max) => Math.floor(Math.random() * max) + 0;

export const getRandom = (array) => array[randomNumber(array.length)];
