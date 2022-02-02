import dayjs from 'dayjs';
import { getDuration } from '../utils/movie';
//import { render, RenderPosition } from '../utils/render';
import SmartView from './smart-view';

const DECIMAL_RADIX = 10;

const DetailsButton = {
  WATCHLIST: 'watchlist',
  WATCHED: 'watched',
  FAVORITE: 'favorite',
};

const createCommentTemplate = (cmnt) => {
  const {id, author, comment, date, emotion} = cmnt;
  return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
            </span>
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${dayjs(date).format('YYYY/MM/DD hh:mm')}</span>
                <button class="film-details__comment-delete" id=${id}>Delete</button>
              </p>
            </div>
          </li>`;
};

const createFilmPopupTemplate = (film, comments, emoji) => {
  const Emoji = {
    SMILE: 'smile',
    SLEEPING: 'sleeping',
    PUKE: 'puke',
    ANGRY: 'angry',
  };

  const { title, totalRating, genre, description, poster, ageRating, director } = film.filmInfo;
  const { watchlist, alreadyWatched, favorite } = film.userDetails;
  const writers = film.filmInfo.writers.join(', ');
  const actors = film.filmInfo.actors.join(', ');
  const country = film.filmInfo.release.releaseCountry;
  const [...genres] = genre.map((genreItem) => `<span class="film-details__genre">${genreItem}</span>`);
  const commentsTemplates = comments.map((cmnt) => createCommentTemplate(cmnt)).join('');
  const releaseDate = dayjs(film.filmInfo.release.date).format('D MMMM YYYY');
  const duration = getDuration(film.filmInfo.runtime);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src=${poster} alt="${title} poster">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${title}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${genres.join(' ')}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <button
              type="button"
              class="
                ${watchlist ? 'film-details__control-button--active' : ''}
                film-details__control-button
                film-details__control-button--watchlist"
              id="watchlist"
              name="watchlist">Add to watchlist</button>
            <button
              type="button"
              class="
                ${alreadyWatched ? 'film-details__control-button--active' : ''}
                film-details__control-button
                film-details__control-button--watched"
              id="watched"
              name="watched">Already watched</button>
            <button
              type="button"
              class="
                ${favorite ? 'film-details__control-button--active' : ''}
                film-details__control-button
                film-details__control-button--favorite"
              id="favorite"
              name="favorite">Add to favorites</button>
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsTemplates}
            </ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label">
                ${emoji ? `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji"></img>` : ''}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${emoji === Emoji.SMILE ? 'checked' : ''}>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${emoji === Emoji.SLEEPING ? 'checked' : ''}>
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${emoji === Emoji.PUKE ? 'checked' : ''}>
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${emoji === Emoji.ANGRY ? 'checked' : ''}>
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`);
};

export default class FilmPopupView extends SmartView {
  #film = null;
  #comments = [];
  #emoji = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;

    this.#setInnerHandlers();
  }

  get template() {
    return createFilmPopupTemplate(this.#film, this.#comments, this.#emoji);
  }

  setCloseButtonClickHandler = (callback) => {
    this.callback.closeButtonClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeButtonClickHandler);
  }

  setInfoButtonsClickHandler = (callback) => {
    this.callback.infoButtonsClick = callback;
    this.element.querySelectorAll('.film-details__control-button').forEach((element) => {
      element.addEventListener('click', this.#infoButtonsClickHandler);
    });
  }

  #closeButtonClickHandler = () => {
    this.callback.closeButtonClick();
  }

  #deleteCommentButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#comments = this.#comments.filter((comment) => comment.id !== parseInt(evt.target.id, DECIMAL_RADIX));
    this.updateElement();
    this.element.querySelector('.film-details__comments-list').scrollIntoView(true);
  }

  #emojiClickHandler = (evt) => {
    evt.preventDefault();
    const emoji = evt.target.value;
    if(this.#emoji === emoji) {
      this.#emoji = null;
      this.updateElement();
      return;
    }
    this.#emoji = emoji;
    this.updateElement();
    this.element.querySelector('.film-details__emoji-list').scrollIntoView({ block: 'center',  behavior: 'smooth' });
  }

  #infoButtonsClickHandler = (evt) => {
    evt.preventDefault();
    switch(evt.target.id) {
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
    this.element.querySelector('.film-details__controls').scrollIntoView({ block: 'center',  behavior: 'smooth' });
  }

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((element) => {
      element.addEventListener('click', this.#emojiClickHandler);
    });
    this.element.querySelectorAll('.film-details__comment-delete').forEach((element) => {
      element.addEventListener('click', this.#deleteCommentButtonClickHandler);
    });
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseButtonClickHandler(this.callback.closeButtonClick);
    this.setInfoButtonsClickHandler(this.callback.infoButtonsClick);
  }
}
