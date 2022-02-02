import { remove, render, RenderPosition, replace, SortType } from '../utils/render';
import FilmCardView from '../view/film-card';
import FilmPopupView from '../view/film-popup';
import FilmsListView from '../view/films-list';
import FilterView from '../view/filter';
import NoFilmsView from '../view/no-films';
import ShowMoreButtonView from '../view/show-more-button';
import SortView from '../view/sort';

const MOVIES_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #mainContainer = null;
  #footerContainer = null;

  #filmsContainer = null;
  #messageContainer = null;
  #buttonContainer = null;
  #currentSort = SortType.DEFAULT;

  #sortComponent = new SortView();
  //#filterComponent = new FilterView();
  #noFilmsComponent = new NoFilmsView();
  #filmsListComponent = new FilmsListView();

  #showMoreButtonComponent = null;
  #prevPopupComponent = null;
  #prevSortComponent = null;
  #films = [];

  constructor(mainContainer, footerContainer) {
    this.#mainContainer = mainContainer;
    this.#footerContainer = footerContainer;
    this.#filmsContainer = this.#mainContainer.querySelector('.films-list');
    this.#messageContainer = this.#filmsContainer;
    this.#buttonContainer = this.#filmsContainer;
  }

  init = (films) => {
    this.#films = [...films];

    this.#renderSort();
    this.#renderFilter();

    this.#renderFilms();
  }

  #getFilms = () => {
    switch(this.#currentSort) {
      case SortType.DATE:
        return this.#films.slice().sort((a, b) => a.filmInfo.release.date < b.filmInfo.release.date);
      case SortType.RATING:
        return this.#films.slice().sort((a, b) => a.filmInfo.totalRating < b.filmInfo.totalRating);
      default:
        return this.#films.slice();
    }
  }

  #renderFilter = () => {
    render(this.#mainContainer, new FilterView(this.#films), RenderPosition.AFTERBEGIN);
  }

  #renderSort = () => {
    this.#sortComponent.setSortClickHandler(this.#handleSortClick);
    render(this.#mainContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPopup = (film) => {
    if(this.#prevPopupComponent) {
      remove(this.#prevPopupComponent);
    }
    const filmPopupComponent = new FilmPopupView(film);

    filmPopupComponent.setCloseButtonClickHandler(() => {
      this.#closePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });

    filmPopupComponent.setInfoButtonsClickHandler((evt) => {
      evt.preventDefault();
      switch(evt.target.id) {
        case 'watchlist':
          film.userDetails = {...film.userDetails, watchlist: !film.userDetails.watchlist};
          this.#renderPopup(film);
          break;
        case 'watched':
          film.userDetails = {...film.userDetails, alreadyWatched: !film.userDetails.alreadyWatched};
          this.#renderPopup(film);
          break;
        case 'favorite':
          film.userDetails = {...film.userDetails, favorite: !film.userDetails.favorite};
          this.#renderPopup(film);
      }
    });

    this.#prevPopupComponent = filmPopupComponent;
    this.#footerContainer.parentElement.classList.add('hide-overflow');
    this.#footerContainer.parentElement.appendChild(filmPopupComponent.element);
  }

  #closePopup = () => {
    this.#footerContainer.parentElement.classList.remove('hide-overflow');
    remove(this.#prevPopupComponent);
    this.#prevPopupComponent = null;
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #renderFilmCard = (film) => {
    const filmCardComponent = new FilmCardView(film);

    filmCardComponent.setFilmCardClickHandler(() => {
      this.#renderPopup(film);
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    render(this.#filmsListComponent, filmCardComponent, RenderPosition.BEFOREEND);
  }

  #renderNoFilms = () => {
    render(this.#messageContainer, this.#noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    const films = this.#getFilms();
    let renderedMoviesCount = MOVIES_COUNT_PER_STEP;

    this.#showMoreButtonComponent.setShowMoreButtonClick(() => {
      films
        .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_COUNT_PER_STEP)
        .forEach((film) => this.#renderFilmCard(film));

      renderedMoviesCount += MOVIES_COUNT_PER_STEP;

      if (renderedMoviesCount >= films.length) {
        remove(this.#showMoreButtonComponent);
      }
    });

    render(this.#buttonContainer, this.#showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmsListContainer = () => {
    render(this.#filmsContainer, this.#filmsListComponent, RenderPosition.BEFOREEND);
  }

  #renderFilms = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
    } else {
      const films = this.#getFilms();

      this.#renderFilmsListContainer();

      for (let i = 0; i < Math.min(films.length, MOVIES_COUNT_PER_STEP); i++) {
        this.#renderFilmCard(films[i]);
      }

      if (this.#films.length > MOVIES_COUNT_PER_STEP) {
        this.#renderShowMoreButton();
      }
    }
  }

  #handleSortClick = (evt) => {
    evt.preventDefault();
    const sortType = evt.target.text;
    if(sortType === this.#currentSort) {
      return;
    }
    this.#prevSortComponent = this.#sortComponent;
    this.#currentSort = sortType;
    this.#sortComponent = new SortView(this.#currentSort);
    this.#sortComponent.setSortClickHandler(this.#handleSortClick);
    replace(this.#sortComponent, this.#prevSortComponent);
    remove(this.#filmsListComponent);
    remove(this.#showMoreButtonComponent);
    this.#renderFilms();
  }
}
