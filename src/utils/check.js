import SortComponent, {SortType} from "../components/sort";
import NoDataComponent from "../components/no-data/no-data-films";
import FilmSectionComponent from "../components/films-main-block";
import ExtraSectionComponent from "../components/films-list-extra";
import ShowMoreButtonComponent from "../components/show-more-button";
import {render, renderFilms, remove} from "../utils/render";
import {Films} from "../const";

export default class PageController {
  constructor(container) {
    this._container = container;
    this._sortComponent = new SortComponent();
    this._noDataComponent = new NoDataComponent();
    this._filmSectionComponent = new FilmSectionComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }
  render(filmList) {

    const filmSection = this._filmSectionComponent.getElement();
    const defaultList = filmList.slice();
    render(this._container, this._sortComponent);
    render(this._container, this._filmSectionComponent);


    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      const filmsLoaded = filmSection.querySelectorAll(`.films-list .film-card`).length;
      switch (sortType) {
        case SortType.DATE:
          filmList.sort((a, b) => b.year - a.year);
          break;
        case SortType.RATING:
          filmList.sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DEFAULT:
          filmList = defaultList.slice();
          break;
      }
      filmSection.querySelector(`.films-list__container`).innerHTML = ``;
      renderFilms(filmList.slice(0, filmsLoaded), filmSection);
    });


    if (filmList.length) {
      renderFilms(filmList.slice(0, Films.INITIAL_AMOUNT), filmSection);
      // Сортировка фильмов по Top Rated и Most Commented
      const topRatedFilms = filmList.slice()
        .sort((a, b) => b.rating - a.rating).slice(0, Films.EXTRA_FILM_AMOUNT);
      const mostCommentedFilms = filmList.slice()
        .sort((a, b) => b.comments.length - a.comments.length).slice(0, Films.EXTRA_FILM_AMOUNT);

      if (topRatedFilms.some((film) => film.rating !== 0)) {
        render(filmSection, new ExtraSectionComponent(`Top Rated`));
      }

      if (mostCommentedFilms.some((film) => film.comments !== 0)) {
        render(filmSection, new ExtraSectionComponent(`Most Commented`));
      }

      const extraSections = filmSection.querySelectorAll(`.films-list--extra`);

      renderFilms(topRatedFilms, extraSections[0]);
      renderFilms(mostCommentedFilms, extraSections[1]);
    } else {
      filmSection.replaceChild(this._noDataComponent.getElement(), filmSection.querySelector(`.films-list`));
    }


    // Рендер кнопки Show More и установка клик-события
    if (filmList.length > Films.INITIAL_AMOUNT) {
      render(filmSection.querySelector(`.films-list`), this._showMoreButtonComponent);

      this._showMoreButtonComponent.setClickHandler(() => {
        let filmsLoaded = filmSection.querySelectorAll(`.films-list .film-card`).length;
        const loadMoreAmount = filmsLoaded + Films.LOAD_AMOUNT;
        renderFilms(filmList.slice(filmsLoaded, loadMoreAmount), filmSection);
        if (loadMoreAmount === Films.TOTAL_AMOUNT) {
          remove(this._showMoreButtonComponent);
        }
      });
    }


  }
}

// Main.js
// import Navigation from "./components/navigation";
// import Profile from "./components/profile";
// import {generateNavigations} from "./mock/mock-navigation";
// import {createRandomFilms} from "./mock/mock-film-card";
// import {render, RenderPosition} from "./utils/render";
// import {Films} from "./const";
// import PageController from "./controllers/films-main-block-controller";
//
// // Генерация случайных фильмов
// const filmList = createRandomFilms(Films.TOTAL_AMOUNT);
//
// const mainContainer = document.querySelector(`.main`);
// const headerContainer = document.querySelector(`.header`);
//
// render(headerContainer, new Profile());
//
//
// const filters = generateNavigations(filmList);
// render(mainContainer, new Navigation(filters), RenderPosition.AFTERBEGIN);
//
// const page = new PageController(mainContainer);
// page.render(filmList);
