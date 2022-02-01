import { createElement } from '../utils/render';

const createFilterTemplate = (movies) => {
  const watchlist = movies.filter((movie) => movie.userDetails.watchlist === true);
  const history = movies.filter((movie) => movie.userDetails.alreadyWatched === true);
  const favorites = movies.filter((movie) => movie.userDetails.favorite === true);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlist.length}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${history.length}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorites.length}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class FilterView {
  #element = null;
  #movies = null;

  constructor(movies) {
    this.#movies = movies;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilterTemplate(this.#movies);
  }

  removeElement() {
    this.#element = null;
  }
}
