import AbstractComponent from "../abstract-component";

const createNoDataFooterTemplate = () =>
  `<p>0 movies inside</p>`;

export default class NoDataFooter extends AbstractComponent {
  getTemplate() {
    return createNoDataFooterTemplate();
  }
}
