const filmsTitleItems = [
  `made-for-each-other`,
  `popeye-meets-sinbad`,
  `sagebrush-trail`,
  `santa-claus-conquers-the-martians`,
  `the-dance-of-life`,
  `the-great-flamarion`,
  `the-man-with-the-golden-arm`,
];

const filmsGenreItems = [
  `Musical`,
  `Classic`,
  `Drama`,
  `Family`,
  `Western`,
  `Fantastic`,
];

const filmsDescriptionsItems = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amettempus.`,
];


const generateRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegeNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegeNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

// Функция для выбора случайных элементов из массива
function getRandomItemFromArray(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random()); // Перемешиваем массив
  return shuffled.slice(0, count); // Выбираем заданное количество элементов
}


const generateFilm = () => {
  const titleAndPoster = generateRandomArrayItem(filmsTitleItems);
  return {
    title: titleAndPoster,
    rating: getRandomIntegeNumber(3, 10),
    year: getRandomIntegeNumber(3, 10),
    hour: getRandomIntegeNumber(0, 3),
    minutes: getRandomIntegeNumber(0, 60),
    genre: generateRandomArrayItem(filmsGenreItems),
    poster: titleAndPoster,
    description: getRandomItemFromArray(filmsDescriptionsItems, getRandomIntegeNumber(1, 5)).join(` `),
    comments: getRandomIntegeNumber(0, 5),
  };
};

const generateFilms = (count) => {
  return new Array(count).fill(``).map(generateFilm);
};

export {generateFilms};
