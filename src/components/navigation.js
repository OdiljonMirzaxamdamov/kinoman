import {createElement} from "../utils.js";

const createNavigationMarkup = (navigation, isChecked) => {
  const {name, count} = navigation;
  return `<a href="#${name}" class="main-navigation__item ${isChecked ? ` main-navigation__item--active` : ``}">
            ${name} <span class="main-navigation__item-count">${count}</span></a>`;
};


const createNavigationTemplate = (navigations) => {
  const navigationsMarkup = navigations.map((it, i) => createNavigationMarkup(it, i === 0)).join(`\n`);

  return `<nav class="main-navigation">
            <div class="main-navigation__items">
              ${navigationsMarkup}
            </div>
            <a href="#stats" class="main-navigation__additional">Stats</a>
         </nav>`;
};


export default class Navigation {
  constructor(navigations) {
    this._film = navigations;
    this._element = null;
  }

  getTemplate() {
    return createNavigationTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


// export const createNavigationTemplate = (navigations) => {
//   const navigationsMarkup = navigations.map((it, i) => createNavigationMarkup(it, i === 0)).join(`\n`);
//
//   return `<nav class="main-navigation">
//             <div class="main-navigation__items">
//               ${navigationsMarkup}
//             </div>
//             <a href="#stats" class="main-navigation__additional">Stats</a>
//          </nav>`;
// };
