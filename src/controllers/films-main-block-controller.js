import FilmCard from "../components/film-card";
import FilmDetails from "../components/film-details";
import FilmDetailsComments from "../components/film-details-comments";
import ShowMoreButton from "../components/show-more-button";
import Sort from "../components/sort";
import FilmsListContainer from "../components/films-list-container";
import FilmsList from "../components/films-list";
import FilmsListExtra from "../components/films-list-extra";
import {generateComments} from "../mock/mock-film-card";
import {remove, render} from "../utils/render";
import {FilmsCount, SortType, RenderPosition, ExtraType} from "../const";


class FilmsMainBlockController {
  constructor(container) {
    this._container = container;
    this._films = [];
    this._showingFilmsCount = FilmsCount.LOAD_AMOUNT;
    this._showMoreButton = new ShowMoreButton();
    this._sort = new Sort();
    this._filmsList = new FilmsList();
    this._filmsListExtraTopRated = new FilmsListExtra(ExtraType.TOPRATED);
    this._filmsListExtraMostCommented = new FilmsListExtra(ExtraType.MOSTCOMMENTED);
    this._renderFilm = this._renderFilm.bind(this);
    this._renderFilmsList = this._renderFilmsList.bind(this);
    this._renderExtraFilmsList = this._renderExtraFilmsList.bind(this);
    this._renderLoadMoreButton = this._renderLoadMoreButton.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  _renderFilm(container, filmCard) {
    const filmCardComponent = new FilmCard(filmCard);

    filmCardComponent.setClickHandler(() => {
      const filmDetails = new FilmDetails(filmCard);

      filmDetails.setCloseButtonClickHandler(() => {
        filmDetails.removeElement();
      });

      render(document.body, filmDetails);

      const filmDetailsCommentsTitleElement = filmDetails.getElement().querySelector(`.film-details__comments-title`);
      const comments = generateComments(filmCard.comments);
      render(filmDetailsCommentsTitleElement, new FilmDetailsComments(comments), RenderPosition.AFTEREND);
    });

    render(container, filmCardComponent);
  }

  _renderFilmsList(filmsBlock, filmsArray) {
    const filmListContainerElement = filmsBlock.getElement().querySelector(`.films-list__container`);
    filmsArray.forEach((filmCard) => this._renderFilm(filmListContainerElement, filmCard));
  }

  _renderExtraFilmsList(filmsBlock, filmsArray) {
    render(filmsBlock.getElement(), new FilmsListContainer());

    const filmListContainerElement = filmsBlock.getElement().querySelector(`.films-list__container`);
    filmsArray.slice(0, FilmsCount.EXTRA_FILM_AMOUNT).forEach((filmCard) => this._renderFilm(filmListContainerElement, filmCard));
  }

  _renderLoadMoreButton() {
    if (this._showingFilmsCount >= this._films.length) {
      return;
    }

    render(this._filmsList.getElement(), this._showMoreButton);

    this._showMoreButton.setClickHandler(this._handleShowMoreButtonClick);
  }

  _handleShowMoreButtonClick() {
    const prevTasksCount = this._showingFilmsCount;
    this._showingFilmsCount += FilmsCount.INITIAL_AMOUNT;
    const sortedTasks = this._getSortedFilms(this._sort.getSortType(), prevTasksCount, this._showingFilmsCount);
    this._renderFilmsList(this._filmsList, sortedTasks);

    if (this._showingFilmsCount >= this._films.length) {
      remove(this._showMoreButton);
    }
  }

  _getSortedFilms(sortType, from, to) {
    let sortedFilms = [...this._films];

    switch (sortType) {
      case SortType.DEFAULT:
        break;
      case SortType.DATE:
        sortedFilms.sort((a, b) => a.year - b.year);
        break;
      case SortType.RATING:
        sortedFilms.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.COMMENTS:
        sortedFilms.sort((a, b) => b.comments - a.comments);
        break;
      default:
        break;
    }

    return sortedFilms.slice(from, to);
  }

  render(films) {
    this._films = films.slice();
    const filmsList = this._filmsList;
    render(this._container.getElement(), this._sort);
    render(this._container.getElement(), filmsList);
    render(this._container.getElement(), this._filmsListExtraTopRated);
    render(this._container.getElement(), this._filmsListExtraMostCommented);

    const sort = document.querySelector(`.sort`);
    this._sort.setSortTypeChangeHandler(sort);

    this._renderFilmsList(filmsList, this._films.slice(0, this._showingFilmsCount));
    this._renderLoadMoreButton();

    this._sort.currentSortType((currentSortType) => {
      let showingFilmsCountOne = filmsList.getElement().querySelectorAll(`.films-list .film-card`).length;
      const filmsListContainer = filmsList.getElement().querySelector(`.films-list__container`);

      filmsListContainer.innerHTML = ``;
      const sortedFilms = this._getSortedFilms(currentSortType, 0, showingFilmsCountOne);

      this._renderFilmsList(filmsList, sortedFilms);
      this._renderLoadMoreButton();
    });

    this._renderExtraFilmsList(this._filmsListExtraTopRated, this._getSortedFilms(SortType.RATING, 0, this._films.length));
    this._renderExtraFilmsList(this._filmsListExtraMostCommented, this._getSortedFilms(SortType.COMMENTS, 0, this._films.length));
  }
}

export default FilmsMainBlockController;


// // Функции компонентов разметки страницы (контейнер элемент и вёрстка)
// import FilmCard from "../components/film-card";
// import FilmDetails from "../components/film-details";
// import FilmDetailsComments from "../components/film-details-comments";
// import ShowMoreButton from "../components/show-more-button";
// import Sort, {SortType} from "../components/sort";
// import FilmsListContainer from "../components/films-list-container";
// import FilmsList from "../components/films-list";
// import FilmsListExtra from "../components/films-list-extra";
//
//
// import {generateComments} from "../mock/mock-film-card";
// import {remove, render, RenderPosition, ExtraType} from "../utils/render";
//
// const EXTRA_FILM_COUNT = 2;
// const SHOWING_FILM_COUNT_ON_START = 5;
// const SHOWING_FILM_COUNT_BY_BUTTON = 5;
//
// // Функция для рендеринга фильмов
// const renderFilm = (container, filmCard) => {
//   const filmCardComponent = new FilmCard(filmCard);
//
//   filmCardComponent.setClickHandler(() => {
//     const filmDetails = new FilmDetails(filmCard);
//
//     filmDetails.setCloseButtonClickHandler(() => {
//       // filmDetails.remove();
//       filmDetails.removeElement();
//     });
//
//     render(document.body, filmDetails);
//
//     const filmDetailsCommentsTitleElement = filmDetails.getElement().querySelector(`.film-details__comments-title`);
//     const comments = generateComments(filmCard.comments);
//     render(filmDetailsCommentsTitleElement, new FilmDetailsComments(comments), RenderPosition.AFTEREND);
//   });
//
//   render(container, filmCardComponent);
// };
//
//
// // Функция для рендеринга БЛОКА фильмов
// const renderFilmsList = (filmsBlock, filmsArray) => {
//
//   render(filmsBlock.getElement(), new FilmsListContainer());
//
//   // рендерим сами фильмы для начального окна в количестве SHOWING_TASKS_COUNT_ON_START
//   const filmListContainerElement = filmsBlock.getElement().querySelector(`.films-list__container`);
//   let showingFilmsCount = SHOWING_FILM_COUNT_ON_START;
//   filmsArray.slice(0, showingFilmsCount).forEach((filmCard) => renderFilm(filmListContainerElement, filmCard));
// };
//
//
// const getSortedFilms = (films, sortType, from, to) => {
//   let sortedFilms = [];
//   const showingFilms = films.slice();
//
//   switch (sortType) {
//     case SortType.DEFAULT:
//       sortedFilms = showingFilms;
//       break;
//     case SortType.DATE:
//       sortedFilms = showingFilms.sort((a, b) => a.year - b.year);
//       break;
//     case SortType.RATING:
//       sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
//       break;
//   }
//
//   return sortedFilms.slice(from, to);
// };
//
//
// // Функция для рендеринга БЛОКА EXTRA фильмов
// const renderExtraFilmsList = (filmsBlock, filmsArray) => {
//   render(filmsBlock.getElement(), new FilmsListContainer());
//
//   // рендерим сами задачи для начального окна в количестве SHOWING_TASKS_COUNT_ON_START
//   const filmListContainerElement = filmsBlock.getElement().querySelector(`.films-list__container`);
//   filmsArray.slice(0, EXTRA_FILM_COUNT).forEach((filmCard) => renderFilm(filmListContainerElement, filmCard));
// };
//
//
// export default class FilmsMainBlockController {
//   constructor(container) {
//     this._container = container;
//     this._filmCard = new FilmCard();
//     this._filmDetails = new FilmDetails();
//     this._filmDetailsComments = new FilmDetailsComments();
//     this._showMoreButton = new ShowMoreButton();
//     this._sort = new Sort();
//     this._filmsListContainer = new FilmsListContainer();
//     this._filmsList = new FilmsList();
//     this._filmsListExtra = new FilmsListExtra();
//   }
//
//   render(films) {
//     const container = this._container.getElement();
//     const sortedTopRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);
//     const sortedMostCommentedFilms = [...films].sort((a, b) => b.comments - a.comments);
//     let showingTasksCount = SHOWING_FILM_COUNT_ON_START;
//
//     const filmsList = new FilmsList();
//     const filmsListExtraTopRated = new FilmsListExtra(ExtraType.TOPRATED);
//     const filmsListExtraMostCommented = new FilmsListExtra(ExtraType.MOSTCOMMENTED);
//
//     const renderLoadMoreButton = () => {
//       if (showingTasksCount >= films.length) {
//         return;
//       }
//       const filmListContainerElement = document.querySelector(`.films-list`);
//       render(filmListContainerElement, this._showMoreButton);
//
//       this._showMoreButton.setClickHandler(() => {
//         const prevTasksCount = showingTasksCount;
//         showingTasksCount = showingTasksCount + SHOWING_FILM_COUNT_BY_BUTTON;
//         const sortedTasks = getSortedFilms(films, this._sort.getSortType(), prevTasksCount, showingTasksCount);
//         renderFilmsList(filmsList, sortedTasks);
//       });
//
//       if (showingTasksCount >= films.length) {
//         remove(this._showMoreButton);
//         this._showMoreButton.getElement().remove();
//         this._showMoreButton.removeElement();
//       }
//     };
//
//     render(container, filmsList);
//     render(container, filmsListExtraTopRated);
//     render(container, filmsListExtraMostCommented);
//
//     // Начальное количество отображаемых задач
//     renderFilmsList(filmsList, films.slice(0, showingTasksCount));
//     renderLoadMoreButton();
//     renderExtraFilmsList(filmsListExtraTopRated, sortedTopRatedFilms);
//     renderExtraFilmsList(filmsListExtraMostCommented, sortedMostCommentedFilms);
//
//
//     this._sort.setSortTypeChangeHandler((sortType) => {
//       showingTasksCount = SHOWING_FILM_COUNT_BY_BUTTON;
//       const sortedTasks = getSortedFilms(films, sortType, 0, showingTasksCount);
//       filmsList.innerHTML = ``;
//
//       renderFilmsList(filmsList, sortedTasks);
//       renderLoadMoreButton();
//     });
//
//   }
// }


// Архив-2
// // Функции компонентов разметки страницы (контейнер элемент и вёрстка)
// import FilmCard from "../components/film-card";
// import FilmDetails from "../components/film-details";
// import FilmDetailsComments from "../components/film-details-comments";
// import ShowMoreButton from "../components/show-more-button";
// import Sort, {SortType} from "../components/sort";
// import FilmsListContainer from "../components/films-list-container";
// import FilmsList from "../components/films-list";
// import FilmsListExtra from "../components/films-list-extra";
//
//
// import {generateComments} from "../mock/mock-film-card";
// import {remove, render, RenderPosition, ExtraType} from "../utils/render";
//
// const EXTRA_FILM_COUNT = 2;
// const SHOWING_FILM_COUNT_ON_START = 5;
// const SHOWING_FILM_COUNT_BY_BUTTON = 5;
//
// // Функция для рендеринга фильмов
// const renderFilm = (container, filmCard) => {
//   const filmCardComponent = new FilmCard(filmCard);
//
//   filmCardComponent.setClickHandler(() => {
//     const filmDetails = new FilmDetails(filmCard);
//
//     filmDetails.setCloseButtonClickHandler(() => {
//       // filmDetails.remove();
//       filmDetails.removeElement();
//     });
//
//     render(document.body, filmDetails);
//
//     const filmDetailsCommentsTitleElement = filmDetails.getElement().querySelector(`.film-details__comments-title`);
//     const comments = generateComments(filmCard.comments);
//     render(filmDetailsCommentsTitleElement, new FilmDetailsComments(comments), RenderPosition.AFTEREND);
//   });
//
//   render(container, filmCardComponent);
// };
//
//
// // Функция для рендеринга БЛОКА фильмов
// const renderFilmsList = (filmsBlock, filmsArray) => {
//
//   render(filmsBlock.getElement(), new FilmsListContainer());
//
//   // рендерим сами фильмы для начального окна в количестве SHOWING_TASKS_COUNT_ON_START
//   const filmListContainerElement = filmsBlock.getElement().querySelector(`.films-list__container`);
//   let showingFilmsCount = SHOWING_FILM_COUNT_ON_START;
//   filmsArray.slice(0, showingFilmsCount).forEach((filmCard) => renderFilm(filmListContainerElement, filmCard));
// };
//
//
// const getSortedFilms = (films, sortType, from, to) => {
//   let sortedFilms = [];
//   const showingFilms = films.slice();
//
//   switch (sortType) {
//     case SortType.DEFAULT:
//       sortedFilms = showingFilms;
//       break;
//     case SortType.DATA:
//       sortedFilms = showingFilms.sort((a, b) => a.year - b.year);
//       break;
//     case SortType.RATING:
//       sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
//       break;
//   }
//
//   return sortedFilms.slice(from, to);
// };
//
//
// // Функция для рендеринга БЛОКА EXTRA фильмов
// const renderExtraFilmsList = (filmsBlock, filmsArray) => {
//   render(filmsBlock.getElement(), new FilmsListContainer());
//
//   // рендерим сами задачи для начального окна в количестве SHOWING_TASKS_COUNT_ON_START
//   const filmListContainerElement = filmsBlock.getElement().querySelector(`.films-list__container`);
//   filmsArray.slice(0, EXTRA_FILM_COUNT).forEach((filmCard) => renderFilm(filmListContainerElement, filmCard));
// };
//
//
// export default class FilmsMainBlockController {
//   constructor(container) {
//     this._container = container;
//     this._filmCard = new FilmCard();
//     this._filmDetails = new FilmDetails();
//     this._filmDetailsComments = new FilmDetailsComments();
//     this._showMoreButton = new ShowMoreButton();
//     this._sort = new Sort();
//     this._filmsListContainer = new FilmsListContainer();
//     this._filmsList = new FilmsList();
//     this._filmsListExtra = new FilmsListExtra();
//   }
//
//   render(films) {
//     const container = this._container.getElement();
//     const sortedTopRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);
//     const sortedMostCommentedFilms = [...films].sort((a, b) => b.comments - a.comments);
//
//     const filmsList = new FilmsList();
//     const filmsListExtraTopRated = new FilmsListExtra(ExtraType.TOPRATED);
//     const filmsListExtraMostCommented = new FilmsListExtra(ExtraType.MOSTCOMMENTED);
//
//     // Функция для отображения кнопки "Показать еще"
//     const renderLoadMoreButton = () => {
//       // Проверяем, не превышено ли количество отображаемых задач
//       if (showingTasksCount >= films.length) {
//         return;
//       }
//
//       // Отображаем кнопку "Показать еще" перед списком задач
//       render(container, this._showMoreButton);
//
//       // Устанавливаем обработчик клика на кнопку "Показать еще"
//       this._showMoreButton.setClickHandler(() => {
//         // Запоминаем количество отображенных задач до клика
//         const prevTasksCount = showingTasksCount;
//         // Увеличиваем количество отображаемых задач
//         showingTasksCount = showingTasksCount + SHOWING_FILM_COUNT_BY_BUTTON;
//
//         // Получаем отсортированные задачи с учетом типа сортировки
//         const sortedTasks = getSortedFilms(films, this._sort.getSortType(), prevTasksCount, showingTasksCount);
//
//         // Отображаем задачи после клика
//         renderFilmsList(filmsList, sortedTasks);
//       });
//
//       // Если отображены все задачи, удаляем кнопку "Показать еще"
//       if (showingTasksCount >= films.length) {
//         remove(this._showMoreButton);
//       }
//     };
//
//     render(container, filmsList);
//     render(container, filmsListExtraTopRated);
//     render(container, filmsListExtraMostCommented);
//
//     // Начальное количество отображаемых задач
//     let showingTasksCount = SHOWING_FILM_COUNT_ON_START;
//
//     renderFilmsList(filmsList, films.slice(0, showingTasksCount));
//     renderLoadMoreButton();
//     renderExtraFilmsList(filmsListExtraTopRated, sortedTopRatedFilms);
//     renderExtraFilmsList(filmsListExtraMostCommented, sortedMostCommentedFilms);
//
//     // Устанавливаем обработчик изменения типа сортировки
//     this._sort.setSortTypeChangeHandler((sortType) => {
//       // Сбрасываем количество отображаемых задач до стандартного значения
//       showingTasksCount = SHOWING_FILM_COUNT_BY_BUTTON;
//
//       // Получаем отсортированные задачи с учетом нового типа сортировки
//       const sortedTasks = getSortedFilms(films, sortType, 0, showingTasksCount);
//
//       // Очищаем список задач
//       filmsList.innerHTML = ``;
//
//       // Отображаем отсортированные задачи
//       renderFilmsList(filmsList, sortedTasks);
//       // Отображаем кнопку "Показать еще"
//       renderLoadMoreButton();
//     });
//   }
// }


// Архив-1
// // Функции компонентов разметки страницы (контейнер элемент и вёрстка)
// import FilmCard from "../components/film-card";
// import FilmDetails from "../components/film-details";
// import FilmDetailsComments from "../components/film-details-comments";
// import ShowMoreButton from "../components/show-more-button";
// import FilmsListContainer from "../components/films-list-container";
// import FilmsList from "../components/films-list";
// import FilmsListExtra from "../components/films-list-extra";
//
//
// import {generateComments} from "../mock/mock-film-card";
// import {render, RenderPosition} from "../utils/render";
//
// const EXTRA_FILM_COUNT = 2;
// const SHOWING_FILM_COUNT_ON_START = 5;
// const SHOWING_FILM_COUNT_BY_BUTTON = 5;
//
// // Функция для рендеринга фильмов
// const renderFilm = (container, filmCard) => {
//   const filmCardComponent = new FilmCard(filmCard);
//
//   filmCardComponent.setElementsClickHandler(() => {
//     const filmDetails = new FilmDetails(filmCard);
//
//     filmDetails.setCloseButtonClickHandler(() => {
//       // filmDetails.remove();
//       filmDetails.removeElement();
//     });
//
//     render(document.body, filmDetails);
//
//     const filmDetailsCommentsTitleElement = filmDetails.getElement().querySelector(`.film-details__comments-title`);
//     const comments = generateComments(filmCard.comments);
//     render(filmDetailsCommentsTitleElement, new FilmDetailsComments(comments), RenderPosition.AFTEREND);
//   });
//
//   render(container, filmCardComponent);
// };
//
//
// // Функция для рендеринга БЛОКА фильмов
// const renderFilmsList = (filmsBlock, filmsArray) => {
//
//   render(filmsBlock.getElement(), new FilmsListContainer());
//
//   // рендерим сами фильмы для начального окна в количестве SHOWING_TASKS_COUNT_ON_START
//   const filmListContainerElement = filmsBlock.getElement().querySelector(`.films-list__container`);
//   let showingFilmsCount = SHOWING_FILM_COUNT_ON_START;
//   filmsArray.slice(0, showingFilmsCount).forEach((filmCard) => renderFilm(filmListContainerElement, filmCard));
//
//
//   // рендерим кнопки "показать больше"
//   const showMoreButton = new ShowMoreButton();
//   render(filmsBlock.getElement(), showMoreButton);
//   const showMoreButtonListener = filmsBlock.getElement().querySelector(`.films-list__show-more`);
//
//   // отслеживаем кнопку и рендерим ещё больше задач
//   showMoreButtonListener.addEventListener(`click`, () => {
//     const prevTasksCount = showingFilmsCount;
//     showingFilmsCount = showingFilmsCount + SHOWING_FILM_COUNT_BY_BUTTON;
//
//     filmsArray.slice(prevTasksCount, showingFilmsCount).forEach((filmCard) => renderFilm(filmListContainerElement, filmCard));
//
//     if (showingFilmsCount >= filmsArray.length) {
//       // showMoreButton.remove();
//       showMoreButton.removeElement();
//     }
//   });
// };
//
//
// // Функция для рендеринга БЛОКА EXTRA фильмов
// const renderExtraFilmsList = (filmsBlock, filmsArray) => {
//   render(filmsBlock.getElement(), new FilmsListContainer());
//
//   // рендерим сами задачи для начального окна в количестве SHOWING_TASKS_COUNT_ON_START
//   const filmListContainerElement = filmsBlock.getElement().querySelector(`.films-list__container`);
//   filmsArray.slice(0, EXTRA_FILM_COUNT).forEach((filmCard) => renderFilm(filmListContainerElement, filmCard));
// };
//
//
// export default class FilmsMainBlockController {
//   constructor(container) {
//     this._container = container;
//     this._filmCard = new FilmCard();
//     this._filmDetails = new FilmDetails();
//     this._filmDetailsComments = new FilmDetailsComments();
//     this._showMoreButton = new ShowMoreButton();
//     this._filmsListContainer = new FilmsListContainer();
//     this._filmsList = new FilmsList();
//     this._filmsListExtra = new FilmsListExtra();
//   }
//
//   render(films) {
//     const container = this._container.getElement();
//     const sortedTopRatedFilms = films.slice().sort((a, b) => b.rating - a.rating);
//     const sortedMostCommentedFilms = [...films].sort((a, b) => b.comments - a.comments);
//
//     const filmsList = new FilmsList();
//     const filmsListExtraTopRated = new FilmsListExtra(`TOP RATED`);
//     const filmsListExtraMostCommented = new FilmsListExtra(`MOST COMMENTED`);
//
//     render(container, filmsList);
//     render(container, filmsListExtraTopRated);
//     render(container, filmsListExtraMostCommented);
//
//     renderFilmsList(filmsList, films);
//     renderExtraFilmsList(filmsListExtraTopRated, sortedTopRatedFilms);
//     renderExtraFilmsList(filmsListExtraMostCommented, sortedMostCommentedFilms);
//
//   }
// }
