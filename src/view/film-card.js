import dayjs from 'dayjs';
import { getDuration } from '../utils/movie';
import AbstractView from './abstract-view';

const createFilmCardTemplate = (movie) => {
  const { title, totalRating, genre, description, poster } = movie.filmInfo;
  const comments = movie.comments;
  const releaseYear = dayjs(movie.filmInfo.release.date).format('YYYY');
  const duration = getDuration(movie.filmInfo.runtime);

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
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmCardView extends AbstractView {
  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createFilmCardTemplate(this.#movie);
  }

  setFilmCardClickHandler = (callback) => {
    this._callback.filmCardClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#filmCardClickHandler);
  }

  #filmCardClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.filmCardClick();
  }
}
