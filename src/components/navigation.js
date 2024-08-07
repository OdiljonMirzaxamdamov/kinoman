import AbstractComponent from "./abstract-component";


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


export default class Navigation extends AbstractComponent {
  constructor(navigation) {
    super();
    this._navigation = navigation;
  }

  getTemplate() {
    return createNavigationTemplate(this._navigation);
  }
}
