import AbstractComponent from "./abstract-component";
import {SortType} from "../const";

const createSortTemplate = () =>
  `<ul class="sort">
     <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
     <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
     <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
  </ul>`;

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(sortContainer) {
    sortContainer.addEventListener(`click`, (event) => {
      if (event.target.classList.contains(`sort__button`)) {
        sortContainer.querySelectorAll(`.sort__button`).forEach((navItem) => {
          navItem.classList.remove(`sort__button--active`);
        });
        event.target.classList.add(`sort__button--active`);
      }
    });
  }

  currentSortType(callback) {
    this.getElement().addEventListener(`click`, (event) => {
      if (event.target.classList.contains(`sort__button`)) {
        const sortType = event.target.dataset.sortType;

        if (this._currentSortType === sortType) {
          return;
        }

        this._currentSortType = sortType;

        // Вызываем callback-функцию с передачей значения текущего типа сортировки
        callback(this._currentSortType);
      }
    });
  }
}
