import {createElement} from "../utils.js";

const createNoDataNavigationTemplate = () =>
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">0</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">0</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">0</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;

const createNoDataSortTemplate = () =>
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;

const createNoDataFilmsTemplate = () =>
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
  </section>`;

const createNoDataFooterTemplate = () =>
  `<p>0 movies inside</p>`;


export default class NoData {
  constructor() {
    this._element = null;
  }

  getElementNoDataNavigation() {
    if (!this._element) {
      this._element = createElement(createNoDataNavigationTemplate());
    }

    return this._element;
  }

  getElementNoDataSort() {
    if (!this._element) {
      this._element = createElement(createNoDataSortTemplate());
    }

    return this._element;
  }

  getElementNoDataFilms() {
    if (!this._element) {
      this._element = createElement(createNoDataFilmsTemplate());
    }

    return this._element;
  }

  getElementNoDataFooter() {
    if (!this._element) {
      this._element = createElement(createNoDataFooterTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
