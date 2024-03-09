import AbstractComponent from "./abstract-component";

const createFooterStatisticsValueTemplate = () =>
  `<p>130 291 movies inside</p>`;

export default class FooterStatisticsValue extends AbstractComponent {
  getTemplate() {
    return createFooterStatisticsValueTemplate();
  }
}
