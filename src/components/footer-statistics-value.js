import {createElement} from "../utils.js";

const createFooterStatisticsValueTemplate = () =>
  `<p>130 291 movies inside</p>`;

export default class FooterStatisticsValue {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticsValueTemplate();
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


// export const createFooterStatisticsValueTemplate = () => {
//   return `<p>130 291 movies inside</p>`;
// };
