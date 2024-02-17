// Функции компонентов разметки страницы (контейнер элемент и вёрстка)
import {createPrifileTemplate} from "./components/profile";
import {createNavigationTemplate} from "./components/navigation";
import {createSortTemplate} from "./components/sort";
import {createFilmsTemplate} from "./components/films";
import {createFilmCardTemplate} from "./components/film-card";
import {createExtraFilmCardTopRatedTemplate} from "./components/film-card-top-rated";
import {createExtraFilmCardMostCommentedTemplate} from "./components/film-card-most-commented";
import {createShowMoreButtonTemplate} from "./components/show-more-button";
import {createFooterStatisticsValueTemplate} from "./components/footer-statistics-value";
import {createFilmDetailsTemplate} from "./components/film-details";

import {generateNavigations, navigationActive} from "./mock/navigation";
import {generateFilms} from "./mock/film-card";

const FILM_COUNT = 20;
const EXTRA_FILM_COUNT = 2;
const SHOWING_FILM_COUNT_ON_START = 5;
const SHOWING_FILM_COUNT_BY_BUTTON = 5;

// Функция Рендера компонентов страницы
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};


// профиль пользователя
const siteProfilElement = document.querySelector(`.header`);
render(siteProfilElement, createPrifileTemplate());


// главное меню с фильтрами и сортировкой
const navigations = generateNavigations();
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createNavigationTemplate(navigations));
render(siteMainElement, createSortTemplate());

// Получаем родительский элемент навигации и добавим функцию Активного состояния навигации
const navigation = document.querySelector(`.main-navigation__items`);
navigationActive(navigation);


// блок-контейнер с фильмами
render(siteMainElement, createFilmsTemplate());


// основные отфильтрованные фильмы
const filmList = siteMainElement.querySelector(`.films`);
const filmListElement = filmList.querySelector(`.films-list`);
const filmListContainerElement = filmListElement.querySelector(`.films-list__container`);
const films = generateFilms(FILM_COUNT);
let showingFilmsCount = SHOWING_FILM_COUNT_ON_START;
films.slice(0, showingFilmsCount).forEach((filmCard) => render(filmListContainerElement, createFilmCardTemplate(filmCard), `beforeend`));


// рендерим кнопки "показать больше"
render(filmListElement, createShowMoreButtonTemplate());


// отслеживаем кнопку и рендерим ещё больше задач
const showMoreButton = filmListElement.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILM_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount).forEach((filmCard) => render(filmListContainerElement, createFilmCardTemplate(filmCard), `beforeend`));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});


// топ рейтинг фильмы
const filmListExtraElement = filmList.querySelectorAll(`.films-list--extra`);
const topRatedFilmsContainerElement = filmListExtraElement[0].querySelector(`.films-list__container`);
for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
  render(topRatedFilmsContainerElement, createExtraFilmCardTopRatedTemplate());
}


// больше всего комментированные фильмы
const mostCommentedFilmsContainerElement = filmListExtraElement[1].querySelector(`.films-list__container`);
for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
  render(mostCommentedFilmsContainerElement, createExtraFilmCardMostCommentedTemplate());
}


// Футер - счётчик количества фильмов сайта
const siteFooterElement = document.querySelector(`.footer`);
const footerElement = siteFooterElement.querySelector(`.footer__statistics`);
render(footerElement, createFooterStatisticsValueTemplate());


// Подробная информация о фильме (Попап), скрыт с помощью visually-hidden
const body = document.querySelector(`body`);
render(body, createFilmDetailsTemplate());
const filmDetails = document.querySelector(`.film-details`);
filmDetails.classList.add(`visually-hidden`);
