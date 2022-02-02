import { getComments } from '../mock/comments';
import { filter } from '../utils/filter';
import { FilterType, remove, render, RenderPosition, replace, SortType } from '../utils/render';
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
  #filmsModel = null;

  #filmsContainer = null;
  #messageContainer = null;
  #buttonContainer = null;
  #currentSort = SortType.DEFAULT;
  #currentFilter = FilterType.DEFAULT;

  #sortComponent = new SortView();
  #filterComponent = null;
  #noFilmsComponent = new NoFilmsView();
  #filmsListComponent = new FilmsListView();
  #popupSourceComponent = null;

  #showMoreButtonComponent = null;
  #prevPopupComponent = null;
  #prevFilterComponent = null;
  //#films = [];

  constructor(mainContainer, footerContainer, filmsModel) {
    this.#mainContainer = mainContainer;
    this.#footerContainer = footerContainer;
    this.#filmsModel = filmsModel;
    this.#filmsContainer = this.#mainContainer.querySelector('.films-list');
    this.#messageContainer = this.#filmsContainer;
    this.#buttonContainer = this.#filmsContainer;
  }

  init = () => {
    this.#renderSort();
    this.#renderFilter();

    this.#renderFilms();
  }

  get films() {
    const filteresFilms = filter[this.#currentFilter](this.#filmsModel.films);
    switch(this.#currentSort) {
      case SortType.DATE:
        return filteresFilms.sort((a, b) => a.filmInfo.release.date < b.filmInfo.release.date);
      case SortType.RATING:
        return filteresFilms.sort((a, b) => a.filmInfo.totalRating < b.filmInfo.totalRating);
      default:
        return filteresFilms;
    }
  }

  #renderFilter = () => {
    this.#filterComponent = new FilterView(this.films, this.#currentFilter);
    this.#filterComponent.setFilterClickHandler(this.#handleFilterClick);
    render(this.#mainContainer, this.#filterComponent, RenderPosition.AFTERBEGIN);
  }

  #renderSort = () => {
    this.#sortComponent.setSortClickHandler(this.#handleSortClick);
    render(this.#mainContainer, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderPopup = (film) => {
    if(this.#prevPopupComponent) {
      remove(this.#prevPopupComponent);
    }
    const comments = getComments();
    const filmPopupComponent = new FilmPopupView(film, comments);

    filmPopupComponent.setCloseButtonClickHandler(() => {
      this.#closePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });

    filmPopupComponent.setInfoButtonsClickHandler((filmUpdate) => {
      this.#popupSourceComponent.updateData(filmUpdate);
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
      this.#popupSourceComponent = filmCardComponent;
      this.#renderPopup(film);
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    filmCardComponent.setInfoButtonsClickHandler((filmUpdate) => {
      filmCardComponent.updateData(filmUpdate);
    });

    render(this.#filmsListComponent, filmCardComponent, RenderPosition.BEFOREEND);
  }

  #renderNoFilms = () => {
    render(this.#messageContainer, this.#noFilmsComponent, RenderPosition.AFTERBEGIN);
  }

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    let renderedMoviesCount = MOVIES_COUNT_PER_STEP;

    this.#showMoreButtonComponent.setShowMoreButtonClick(() => {
      this.films
        .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_COUNT_PER_STEP)
        .forEach((film) => this.#renderFilmCard(film));

      renderedMoviesCount += MOVIES_COUNT_PER_STEP;

      if (renderedMoviesCount >= this.films.length) {
        remove(this.#showMoreButtonComponent);
      }
    });

    render(this.#buttonContainer, this.#showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmsListContainer = () => {
    render(this.#filmsContainer, this.#filmsListComponent, RenderPosition.BEFOREEND);
  }

  #renderFilms = () => {
    if (this.films.length === 0) {
      this.#renderNoFilms();
    } else {

      this.#renderFilmsListContainer();

      for (let i = 0; i < Math.min(this.films.length, MOVIES_COUNT_PER_STEP); i++) {
        this.#renderFilmCard(this.films[i]);
      }

      if (this.films.length > MOVIES_COUNT_PER_STEP) {
        this.#renderShowMoreButton();
      }
    }
  }

  #handleSortClick = (evt) => {
    const sortType = evt.target.text;
    if(sortType === this.#currentSort) {
      return;
    }
    this.#prevFilterComponent = this.#sortComponent;
    this.#currentSort = sortType;
    this.#sortComponent = new SortView(this.#currentSort);
    this.#sortComponent.setSortClickHandler(this.#handleSortClick);
    replace(this.#sortComponent, this.#prevFilterComponent);
    remove(this.#filmsListComponent);
    remove(this.#showMoreButtonComponent);
    this.#renderFilms();
  }

  #handleFilterClick = (filterUpdate) => {
    if(filterUpdate === this.#currentFilter) {
      return;
    }
    this.#prevFilterComponent = this.#filterComponent;
    this.#currentFilter = filterUpdate;
    this.#filterComponent = new FilterView(this.films, this.#currentFilter);
    this.#filterComponent.setFilterClickHandler(this.#handleFilterClick);
    replace(this.#filterComponent, this.#prevFilterComponent);
    remove(this.#filmsListComponent);
    remove(this.#showMoreButtonComponent);
    this.#renderFilms();
  }
}
