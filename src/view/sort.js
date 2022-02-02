import { SortType } from '../utils/render';
import AbstractView from './abstract-view';

const createSortTemplate = (currentSort) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button ${SortType.DEFAULT === currentSort ? 'sort__button--active' : ''}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${SortType.DATE === currentSort ? 'sort__button--active' : ''}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${SortType.RATING === currentSort ? 'sort__button--active' : ''}">Sort by rating</a></li>
  </ul>`
);

export default class SortView extends AbstractView {
  #sort = null;

  constructor(sort = SortType.DEFAULT) {
    super();
    this.#sort = sort;
  }

  get template() {
    return createSortTemplate(this.#sort);
  }

  setSortClickHandler = (callback) => {
    this._callback.sortClick = callback;
    this.element.addEventListener('click', this.#sortClickHandler);
  }

  #sortClickHandler = (evt) => {
    this._callback.sortClick(evt);
  }
}
