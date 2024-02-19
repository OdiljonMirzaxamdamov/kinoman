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

const filmsDirectorItems = [
  `Anthony Mann`,
  `Capitan Kook`,
  `Mantara Kupara`,
  `Ali Vali`,
  `Etoo Pisatel`,
  `Kortni Corks`,
];

const filmsWritersItems = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Helena Hyus`,
  `Firmino Perera`,
  `Xesso Faster`,
];

const filmsActorsItems = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `Van Helsing`,
  `Toni Stark`,
  `Leo Dicaprio`,
];

const filmsCountryItems = [
  `USA`,
  `Mexico`,
  `UK`,
  `France`,
  `Italy`,
  `Germany`,
];

const filmsCommentEmojiItems = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const filmsCommentTextItems = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
  `Bugagag bazzinga`,
  `My personal teste`,
];

const filmsCommentAuthorItems = [
  `Tim Macoveev`,
  `John Doe`,
  `Grisha Vachovski`,
  `Kurtman Kosso`,
];

const filmsCommentDayItems = [
  `2019/12/31 23:59`,
  `2 days ago`,
  `Today`,
  `4 weeks ago`,
];


const generateRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
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
    rating: getRandomIntegerNumber(3, 10) + (getRandomIntegerNumber(1, 9) / 10),
    year: getRandomIntegerNumber(1920, 1970),
    hour: getRandomIntegerNumber(1, 3),
    minutes: getRandomIntegerNumber(30, 45),
    genre: getRandomItemFromArray(filmsGenreItems, getRandomIntegerNumber(3, 3)),
    poster: titleAndPoster,
    description: getRandomItemFromArray(filmsDescriptionsItems, getRandomIntegerNumber(1, 5)).join(` `),
    comments: getRandomIntegerNumber(0, 5),
    director: generateRandomArrayItem(filmsDirectorItems),
    writers: getRandomItemFromArray(filmsWritersItems, getRandomIntegerNumber(1, 3)).join(`, `),
    actors: getRandomItemFromArray(filmsActorsItems, getRandomIntegerNumber(3, 3)).join(`, `),
    commentEmoji: generateRandomArrayItem(filmsCommentEmojiItems),
    commentText: generateRandomArrayItem(filmsCommentTextItems),
    commentAuthor: generateRandomArrayItem(filmsCommentAuthorItems),
    commentDay: generateRandomArrayItem(filmsCommentDayItems),
  };
};

const generateFilms = (count) => {
  return new Array(count).fill(``).map(generateFilm);
};

const generateComments = (count) => {
  return new Array(count).fill(``).map(generateFilm);
};

export {generateFilms, generateComments};
