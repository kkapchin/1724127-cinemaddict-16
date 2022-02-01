import { createElement } from '../utils/render';

const createFooterStatsTemplate = () => (
  `<section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`
);

export default class FooterStatsView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFooterStatsTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
