const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * ((max + 1) - min) + min);


const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomBoolean = () => Math.random() > 0.5;

const getRandomItemFromArray = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const isEscPressed = (evt) => {
  return evt.key === `Escape` || evt.key === `Esc`;
};

export {
  formatTime,
  getRandomArrayItem,
  getRandomNumber,
  getRandomBoolean,
  getRandomIntegerNumber,
  getRandomItemFromArray,
  isEscPressed
};
