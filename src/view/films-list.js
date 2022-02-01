import { createElement } from '../utils/render';

const createFilmsListTemplate = () => (
  `<div class="films-list__container">
  </div>`
);

export default class FilmsListView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmsListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
