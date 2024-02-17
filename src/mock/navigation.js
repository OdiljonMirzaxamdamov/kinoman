const navigationNames = [
  `All movies`, `Watchlist`, `History`, `Favorites`
];

const generateNavigations = () => {
  return navigationNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 15),
    };
  });
};

const navigationActive = (navigation) => {
  // Добавляем обработчик событий для клика на родительском элементе навигации
  navigation.addEventListener(`click`, (event) => {
    if (event.target.classList.contains(`main-navigation__item`)) {
      navigation.querySelectorAll(`.main-navigation__item`).forEach((navItem) => {
        navItem.classList.remove(`main-navigation__item--active`);
      });
      event.target.classList.add(`main-navigation__item--active`);
    }
  });
};

export {generateNavigations, navigationActive};
