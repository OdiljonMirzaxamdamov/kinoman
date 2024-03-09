// Функции компонентов разметки страницы (контейнер элемент и вёрстка)
import Profile from "./components/profile";
import Navigation from "./components/navigation";
import FilmsMainBlock from "./components/films-main-block";
import FooterStatisticsValue from "./components/footer-statistics-value";
import NoDataNavigation from "./components/no-data/no-data-navigation";
import NoDataSort from "./components/no-data/no-data-sort";
import NoDataFilms from "./components/no-data/no-data-films";
import NoDataFooter from "./components/no-data/no-data-footer";
import {generateNavigations, navigationActive} from "./mock/mock-navigation";
import {generateFilms} from "./mock/mock-film-card";
import {render} from "./utils/render";
import {FilmsCount} from "./const";
import FilmsMainBlockController from "./controllers/films-main-block-controller";


const films = generateFilms(FilmsCount.TOTAL_AMOUNT);
const navigations = generateNavigations();
const siteProfilElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);
const footerElement = siteFooterElement.querySelector(`.footer__statistics`);


// первый блок профила
render(siteProfilElement, new Profile());

// ставим проверку если филмы отсутсвуют, то отобразиться NO DATA окно
if (films.length === FilmsCount.NO_DATA) {
  render(siteMainElement, new NoDataNavigation());
  render(siteMainElement, new NoDataSort());
  render(siteMainElement, new NoDataFilms());
  render(footerElement, new NoDataFooter());
  throw new Error(`There are no movies in our database`);
}


// второй блок навигацию
render(siteMainElement, new Navigation(navigations));
const navigation = document.querySelector(`.main-navigation__items`);
navigationActive(navigation);


// четвертый основно контейнер фильмов
const filmsMainBlock = new FilmsMainBlock();
const filmsMainBlockController = new FilmsMainBlockController(filmsMainBlock);
render(siteMainElement, filmsMainBlock);
filmsMainBlockController.render(films);


// Футер - счётчик количества фильмов сайта
render(footerElement, new FooterStatisticsValue());


// 5-лекция
// // Функции компонентов разметки страницы (контейнер элемент и вёрстка)
// import FilmCard from "./components/film-card";
// import FilmDetails from "./components/film-details";
// import FilmDetailsComments from "./components/film-details-comments";
// import ShowMoreButton from "./components/show-more-button";
// import FilmsListContainer from "./components/films-list-container";
// import FilmsList from "./components/films-list";
// import FilmsListExtra from "./components/films-list-extra";
//
// // No-data функции
// import NoDataNavigation from "./components/no-data/no-data-navigation";
// import NoDataSort from "./components/no-data/no-data-sort";
// import NoDataFilms from "./components/no-data/no-data-films";
// import NoDataFooter from "./components/no-data/no-data-footer";
//
//
// const EXTRA_FILM_COUNT = 2;
// const SHOWING_FILM_COUNT_ON_START = 5;
// const SHOWING_FILM_COUNT_BY_BUTTON = 5;
//
//
// const sortedTopRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);
// const sortedMostCommentedFilms = [...films].sort((a, b) => b.comments - a.comments);
//
//
// const filmsList = new FilmsList();
//
//
// // ставим проверку если филмы отсутсвуют, то отобразиться NO DATA окно
// if (films.length === 0) {
//   render(siteMainElement, new NoDataNavigation());
//   render(siteMainElement, new NoDataSort());
//   render(siteMainElement, new NoDataFilms());
//   render(footerElement, new NoDataFooter());
//
//   throw new Error(`There are no movies in our database`);
// }
//
//
// const filmsListExtraTopRated = new FilmsListExtra(`TOP RATED`);
// const filmsListExtraMostCommented = new FilmsListExtra(`MOST COMMENTED`);
//
//
// render(filmsMainBlock.getElement(), filmsList.getElement());
// render(filmsMainBlock.getElement(), filmsListExtraTopRated.getElement());
// render(filmsMainBlock.getElement(), filmsListExtraMostCommented.getElement());
//
//
// // Функция для рендеринга фильмов
// const renderFilm = (container, filmCard) => {
//   const filmCardComponent = new FilmCard(filmCard);
//
//   filmCardComponent.setElementsClickHandler(() => {
//     const filmDetails = new FilmDetails(filmCard);
//
//     filmDetails.setCloseButtonClickHandler(() => {
//       filmDetails.getElement().remove();
//       filmDetails.removeElement();
//     });
//
//     render(document.body, filmDetails.getElement());
//
//     const filmDetailsCommentsTitleElement = filmDetails.getElement().querySelector(`.film-details__comments-title`);
//     const comments = generateComments(filmCard.comments);
//     render(filmDetailsCommentsTitleElement, new FilmDetailsComments(comments).getElement(), RenderPosition.AFTEREND);
//   });
//
//   render(container, filmCardComponent.getElement());
// };
//
//
// // Функция для рендеринга БЛОКА фильмов
// const renderFilmsList = (filmsBlock, filmsArray) => {
//
//   render(filmsBlock.getElement(), new FilmsListContainer().getElement());
//
//   // рендерим сами задачи для начального окна в количестве SHOWING_TASKS_COUNT_ON_START
//   const filmListContainerElement = filmsBlock.getElement().querySelector(`.films-list__container`);
//   let showingFilmsCount = SHOWING_FILM_COUNT_ON_START;
//   filmsArray.slice(0, showingFilmsCount).forEach((filmCard) => renderFilm(filmListContainerElement, filmCard));
//
//
//   // рендерим кнопки "показать больше"
//   const showMoreButton = new ShowMoreButton();
//   render(filmsBlock.getElement(), showMoreButton.getElement());
//
//   // отслеживаем кнопку и рендерим ещё больше задач
//   showMoreButton.getElement().addEventListener(`click`, () => {
//     const prevTasksCount = showingFilmsCount;
//     showingFilmsCount = showingFilmsCount + SHOWING_FILM_COUNT_BY_BUTTON;
//
//     films.slice(prevTasksCount, showingFilmsCount).forEach((filmCard) => renderFilm(filmListContainerElement, filmCard));
//
//     if (showingFilmsCount >= films.length) {
//       showMoreButton.getElement().remove();
//       showMoreButton.removeElement();
//     }
//   });
// };
//
//
// // Функция для рендеринга БЛОКА EXTRA фильмов
// const renderExtraFilmsList = (filmsBlock, filmsArray) => {
//   render(filmsBlock.getElement(), new FilmsListContainer().getElement());
//
//   // рендерим сами задачи для начального окна в количестве SHOWING_TASKS_COUNT_ON_START
//   const filmListContainerElement = filmsBlock.getElement().querySelector(`.films-list__container`);
//   filmsArray.slice(0, EXTRA_FILM_COUNT).forEach((filmCard) => renderFilm(filmListContainerElement, filmCard));
// };
//
//
// renderFilmsList(filmsList, films);
// renderExtraFilmsList(filmsListExtraTopRated, sortedTopRatedFilms);
// renderExtraFilmsList(filmsListExtraMostCommented, sortedMostCommentedFilms);


// 4-лекция
// // Функции компонентов разметки страницы (контейнер элемент и вёрстка)
// import {createPrifileTemplate} from "./components/profile";
// import {createNavigationTemplate} from "./components/navigation";
// import {createSortTemplate} from "./components/sort";
// import {createFilmsTemplate} from "./components/films";
// import {createFilmCardTemplate} from "./components/film-card";
// import {createShowMoreButtonTemplate} from "./components/show-more-button";
// import {createFooterStatisticsValueTemplate} from "./components/footer-statistics-value";
// import {createFilmDetailsTemplate} from "./components/film-details";
// import {createFilmDetailsCommentsTemplate} from "./components/film-details-comments";
//
// import {generateNavigations, navigationActive} from "./mock/navigation";
// import {generateFilms, generateComments} from "./mock/film-card";
//
// const FILM_COUNT = 15;
// const EXTRA_FILM_COUNT = 2;
// const SHOWING_FILM_COUNT_ON_START = 5;
// const SHOWING_FILM_COUNT_BY_BUTTON = 5;
//
// // Функция Рендера компонентов страницы
// const render = (container, template, place = `beforeend`) => {
//   container.insertAdjacentHTML(place, template);
// };
//
//
// // профиль пользователя
// const siteProfilElement = document.querySelector(`.header`);
// render(siteProfilElement, createPrifileTemplate());
//
//
// // главное меню с фильтрами и сортировкой
// const navigations = generateNavigations();
// const siteMainElement = document.querySelector(`.main`);
// render(siteMainElement, createNavigationTemplate(navigations));
// render(siteMainElement, createSortTemplate());
//
// // Получаем родительский элемент навигации и добавим функцию Активного состояния навигации
// const navigation = document.querySelector(`.main-navigation__items`);
// navigationActive(navigation);
//
//
// // блок-контейнер с фильмами
// render(siteMainElement, createFilmsTemplate());
//
//
// // основные отфильтрованные фильмы
// const filmList = siteMainElement.querySelector(`.films`);
// const filmListElement = filmList.querySelector(`.films-list`);
// const filmListContainerElement = filmListElement.querySelector(`.films-list__container`);
// const films = generateFilms(FILM_COUNT);
// let showingFilmsCount = SHOWING_FILM_COUNT_ON_START;
// films.slice(0, showingFilmsCount).forEach((filmCard) => render(filmListContainerElement, createFilmCardTemplate(filmCard), `beforeend`));
//
//
// // рендерим кнопки "показать больше"
// render(filmListElement, createShowMoreButtonTemplate());
//
//
// // отслеживаем кнопку и рендерим ещё больше фильмов
// const showMoreButton = filmListElement.querySelector(`.films-list__show-more`);
// showMoreButton.addEventListener(`click`, () => {
//   const prevFilmsCount = showingFilmsCount;
//   showingFilmsCount = showingFilmsCount + SHOWING_FILM_COUNT_BY_BUTTON;
//   films.slice(prevFilmsCount, showingFilmsCount).forEach((filmCard) => render(filmListContainerElement, createFilmCardTemplate(filmCard), `beforeend`));
//
//   if (showingFilmsCount >= films.length) {
//     showMoreButton.remove();
//   }
// });
//
//
// // топ рейтинг фильмы
// const filmListExtraElement = filmList.querySelectorAll(`.films-list--extra`);
// const topRatedFilmsContainerElement = filmListExtraElement[0].querySelector(`.films-list__container`);
// const sortedTopRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);
// sortedTopRatedFilms.slice(0, EXTRA_FILM_COUNT).forEach((filmCard) => render(topRatedFilmsContainerElement, createFilmCardTemplate(filmCard), `beforeend`));
//
//
// // больше всего комментированные фильмы
// const mostCommentedFilmsContainerElement = filmListExtraElement[1].querySelector(`.films-list__container`);
// const sortedMostCommentedFilms = [...films].sort((a, b) => b.comments - a.comments);
// sortedMostCommentedFilms.slice(0, EXTRA_FILM_COUNT).forEach((filmCard) => render(mostCommentedFilmsContainerElement, createFilmCardTemplate(filmCard), `beforeend`));
//
//
// // Футер - счётчик количества фильмов сайта
// const siteFooterElement = document.querySelector(`.footer`);
// const footerElement = siteFooterElement.querySelector(`.footer__statistics`);
// render(footerElement, createFooterStatisticsValueTemplate());
//
//
// // Подробная информация о фильме (Попап) из основного окна
// const body = document.querySelector(`body`);
// const filmCards = filmListContainerElement.querySelectorAll(`.film-card`);
// filmCards.forEach((filmCard, index) => {
//   filmCard.addEventListener(`click`, () => {
//     render(body, createFilmDetailsTemplate(films[index]));
//
//     // создаём комментарии к фильму
//     const filmDetails = document.querySelector(`.film-details`);
//     const filmDetailsCommentList = filmDetails.querySelector(`.film-details__comments-list`);
//     const comments = generateComments(films[index].comments);
//     comments.forEach((filmComments) => render(filmDetailsCommentList, createFilmDetailsCommentsTemplate(filmComments), `beforeend`));
//
//     // закрываем Попап удаляя ДОМ-элемент
//     const filmDetailsCloseButton = document.querySelector(`.film-details__close-btn`);
//     filmDetailsCloseButton.addEventListener(`click`, () => {
//       filmDetails.remove();
//     });
//   });
// });
//
//
// // Подробная информация о фильме (Попап) из топ Рейтинга
// const filmCardsTopRated = topRatedFilmsContainerElement.querySelectorAll(`.film-card`);
// filmCardsTopRated.forEach((filmCard, index) => {
//   filmCard.addEventListener(`click`, () => {
//     render(body, createFilmDetailsTemplate(sortedTopRatedFilms[index]));
//
//     // создаём комментарии к фильму
//     const filmDetails = document.querySelector(`.film-details`);
//     const filmDetailsCommentList = filmDetails.querySelector(`.film-details__comments-list`);
//     const comments = generateComments(sortedTopRatedFilms[index].comments);
//     comments.forEach((filmComments) => render(filmDetailsCommentList, createFilmDetailsCommentsTemplate(filmComments), `beforeend`));
//
//     // закрываем Попап удаляя ДОМ-элемент
//     const filmDetailsCloseButton = filmDetails.querySelector(`.film-details__close-btn`);
//     filmDetailsCloseButton.addEventListener(`click`, () => {
//       filmDetails.remove();
//     });
//   });
// });
//
//
// // Подробная информация о фильме (Попап) из топ Комментариев
// const filmCardsMostComment = mostCommentedFilmsContainerElement.querySelectorAll(`.film-card`);
// filmCardsMostComment.forEach((filmCard, index) => {
//   filmCard.addEventListener(`click`, () => {
//     render(body, createFilmDetailsTemplate(sortedMostCommentedFilms[index]));
//
//     // создаём комментарии к фильму
//     const filmDetails = document.querySelector(`.film-details`);
//     const filmDetailsCommentList = filmDetails.querySelector(`.film-details__comments-list`);
//     const comments = generateComments(sortedMostCommentedFilms[index].comments);
//     comments.forEach((filmComments) => render(filmDetailsCommentList, createFilmDetailsCommentsTemplate(filmComments), `beforeend`));
//
//     // закрываем Попап удаляя ДОМ-элемент
//     const filmDetailsCloseButton = filmDetails.querySelector(`.film-details__close-btn`);
//     filmDetailsCloseButton.addEventListener(`click`, () => {
//       filmDetails.remove();
//     });
//   });
// });
