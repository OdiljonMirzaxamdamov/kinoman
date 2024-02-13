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

const FILM_COUNT = 5;
const EXTRA_FILM_COUNT = 2;

// Функция Рендера компонентов страницы
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};


// профиль пользователя
const siteProfilElement = document.querySelector(`.header`);
render(siteProfilElement, createPrifileTemplate());


// главное меню с фильтрами и сортировкой
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createNavigationTemplate());
render(siteMainElement, createSortTemplate());
render(siteMainElement, createFilmsTemplate());


// блок с фильмами
const filmList = siteMainElement.querySelector(`.films`);
const filmListElement = filmList.querySelector(`.films-list`);
const filmListContainerElement = filmListElement.querySelector(`.films-list__container`);
for (let i = 0; i < FILM_COUNT; i++) {
  render(filmListContainerElement, createFilmCardTemplate());
}
render(filmListElement, createShowMoreButtonTemplate());


// блок топ рейтинг фильмами
const filmListExtraElement = filmList.querySelectorAll(`.films-list--extra`);
const topRatedFilmsContainerElement = filmListExtraElement[0].querySelector(`.films-list__container`);
for (let i = 0; i < EXTRA_FILM_COUNT; i++) {
  render(topRatedFilmsContainerElement, createExtraFilmCardTopRatedTemplate());
}


// блок больше всего комментированными фильмами
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
