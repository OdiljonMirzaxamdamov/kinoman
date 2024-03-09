import AbstractComponent from "./abstract-component";

const createFilmListContainerTemplate = () =>
  `<div class="films-list__container"></div>`;

export default class FilmsListContainer extends AbstractComponent {
  getTemplate() {
    return createFilmListContainerTemplate();
  }
}
