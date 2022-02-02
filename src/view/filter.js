import { FilterType } from '../utils/render';
import AbstractView from './abstract-view';

const createFilterTemplate = (quantity, currentFilter) => {
  const { watchlist, history, favorites} = quantity;
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item ${FilterType.DEFAULT === currentFilter ? 'main-navigation__item--active' : ''}">All movies</a>
        <a href="#watchlist" class="main-navigation__item ${FilterType.WATCHLIST === currentFilter ? 'main-navigation__item--active' : ''}">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
        <a href="#history" class="main-navigation__item ${FilterType.HISTORY === currentFilter ? 'main-navigation__item--active' : ''}">History <span class="main-navigation__item-count">${history}</span></a>
        <a href="#favorites" class="main-navigation__item ${FilterType.FAVORITES === currentFilter ? 'main-navigation__item--active' : ''}">Favorites <span class="main-navigation__item-count">${favorites}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class FilterView extends AbstractView {
  #quantity = {};
  #filter = null;

  constructor(films, filter = FilterType.DEFAULT) {
    super();
    this.#quantity = {
      watchlist: films.filter((film) => film.userDetails.watchlist === true).length,
      history: films.filter((film) => film.userDetails.alreadyWatched === true).length,
      favorites: films.filter((film) => film.userDetails.favorite === true).length,
    };

    this.#filter = filter;
  }

  get template() {
    return createFilterTemplate(this.#quantity, this.#filter);
  }

  setFilterClickHandler = (callback) => {
    this.callback.filterClick = callback;
    this.element.querySelectorAll('.main-navigation__item').forEach((element) => {
      element.addEventListener('click', this.#filterClickHandler);
    });
  }

  #filterClickHandler = (evt) => {
    evt.preventDefault();
    if(evt.target.className === 'main-navigation__item-count') {
      this.#filter = evt.target.parentElement.text.split(' ')[0];
    } else {
      this.#filter = evt.target.text.split(' ')[0];
    }
    this.callback.filterClick(this.#filter);
  }
}
