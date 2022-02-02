import dayjs from 'dayjs';
import { getDuration } from '../utils/movie';
import SmartView from './smart-view';

const DetailsButton = {
  WATCHLIST: 'Add to watchlist',
  WATCHED: 'Mark as watched',
  FAVORITE: 'Mark as favorite',
};

const createFilmCardTemplate = (film) => {
  const { title, totalRating, genre, description, poster } = film.filmInfo;
  const { watchlist, alreadyWatched, favorite } = film.userDetails;
  const comments = film.comments;
  const releaseYear = dayjs(film.filmInfo.release.date).format('YYYY');
  const duration = getDuration(film.filmInfo.runtime);

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseYear}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genre[0]}</span>
        </p>
        <img src=${poster} alt="" class="film-card__poster">
        <p class="film-card__description">${description.length > 140 ? `${description.slice(0, 138)}...` : description}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCardView extends SmartView {
  #film = null;

  constructor(film) {
    super();
    this.data = film;

    this.#setInnerHandlers();
  }

  get template() {
    this.#film = this.data;
    return createFilmCardTemplate(this.#film);
  }

  setFilmCardClickHandler = (callback) => {
    this.callback.filmCardClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#filmCardClickHandler);
  }

  setInfoButtonsClickHandler = (callback) => {
    this.callback.infoButtonsClick = callback;
    this.element.querySelectorAll('.film-card__controls-item').forEach((element) => {
      element.addEventListener('click', this.#infoButtonsClickHandler);
    });
  }

  #filmCardClickHandler = (evt) => {
    evt.preventDefault();
    this.callback.filmCardClick();
  }

  #infoButtonsClickHandler = (evt) => {
    evt.preventDefault();
    switch(evt.target.textContent) {
      case DetailsButton.WATCHLIST:
        this.#film.userDetails = {...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist};
        break;
      case DetailsButton.WATCHED:
        this.#film.userDetails = {...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched};
        break;
      case DetailsButton.FAVORITE:
        this.#film.userDetails = {...this.#film.userDetails, favorite: !this.#film.userDetails.favorite};
    }
    this.callback.infoButtonsClick(this.#film);
    this.updateElement();
    this.element.querySelector('.film-card__controls-item').scrollIntoView({ block: 'center',  behavior: 'smooth' });
  }

  #setInnerHandlers = () => {
    //
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFilmCardClickHandler(this.callback.filmCardClick);
    this.setInfoButtonsClickHandler(this.callback.infoButtonsClick);
  }
}
