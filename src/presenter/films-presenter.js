import { remove, render, RenderPosition } from '../utils/render';
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

  #sortComponent = new SortView();
  //#filterComponent = new FilterView();
  #noFilmsComponent = new NoFilmsView();
  #filmsListComponent = new FilmsListView();

  #prevPopupComponent = null;
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

  #renderFilter = () => {
    render(this.#mainContainer, new FilterView(this.#films), RenderPosition.AFTERBEGIN);
  }

  #renderSort = () => {
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

    /* const closePopup = (popupElement) => {
      this.#footerContainer.parentElement.classList.remove('hide-overflow');
      this.#footerContainer.parentElement.removeChild(popupElement);
    }; */

    /* const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.#closePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    }; */

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
    const showMoreButton = new ShowMoreButtonView();
    let renderedMoviesCount = MOVIES_COUNT_PER_STEP;

    render(this.#buttonContainer, showMoreButton, RenderPosition.BEFOREEND);

    showMoreButton.setShowMoreButtonClick(() => {
      this.#films
        .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_COUNT_PER_STEP)
        .forEach((film) => this.#renderFilmCard(film));

      renderedMoviesCount += MOVIES_COUNT_PER_STEP;

      if (renderedMoviesCount >= this.#films.length) {
        this.#buttonContainer.removeChild(showMoreButton.element);
      }
    });
  }

  #renderFilmsListContainer = () => {
    render(this.#filmsContainer, this.#filmsListComponent, RenderPosition.BEFOREEND);
  }

  #renderFilms = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
    } else {
      this.#renderFilmsListContainer();
      for (let i = 0; i < Math.min(this.#films.length, MOVIES_COUNT_PER_STEP); i++) {
        this.#renderFilmCard(this.#films[i]);
      }

      if (this.#films.length > MOVIES_COUNT_PER_STEP) {
        this.#renderShowMoreButton();
      }
    }
  }
}
