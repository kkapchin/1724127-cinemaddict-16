import AbstractView from './abstract-view';

const createNoFilmsTemplate = (message) => `<h2 class="films-list__title">${message}</h2>`;

export default class NoFilmsView extends AbstractView {
  #Message = {
    ALL: 'There are no movies in our database',
    WATCHLIST: 'There are no movies to watch now',
    HISTORY: 'There are no watched movies now',
    FAVORITES: 'There are no favorite movies now',
  }
  /* #allMovies = 'There are no movies in our database';
  #watchlist = 'There are no movies to watch now';
  #history = 'There are no watched movies now';
  #favorites = 'There are no favorite movies now'; */

  /* get element() {
    switch(filter) {
      case 'All':
        this.#element = createElement(this.template(this.#Message.ALL))
        return this.#element;
      case 'Watchlist':
        this.#element = createElement(this.template(this.#Message.WATCHLIST))
        return this.#element;
      case 'History':
        this.#element = createElement(this.template(this.#Message.HISTORY))
        return this.#element;
      case 'Favorites':
        this.#element = createElement(this.template(this.#Message.FAVORITES))
        return this.#element;
    }
  } */

  get template() {
    return createNoFilmsTemplate(this.#Message.ALL);
  }
}
