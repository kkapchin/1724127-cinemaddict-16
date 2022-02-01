import AbstractView from './abstract-view';

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

export default class FilterView extends AbstractView {
  #movies = null;

  constructor(movies) {
    super();
    this.#movies = movies;
  }

  get template() {
    return createFilterTemplate(this.#movies);
  }
}
