import { render, RenderPosition } from '../utils/render';
import FilmCardView from '../view/film-card';
import FilmPopupView from '../view/film-popup';
import FilmsListView from '../view/films-list';
import FilterView from '../view/filter';
import FooterStatsView from '../view/footer-statistics';
import NoFilmsView from '../view/no-films';
import ShowMoreButtonView from '../view/show-more-button';
import SortView from '../view/sort';
import UserProfileView from '../view/user-profile';

const MOVIES_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #header = document.querySelector('.header');
  #main = document.querySelector('.main');
  #footer = document.querySelector('.footer');
  #filmsContainer = this.#main.querySelector('.films-list');
  #messageContainer = this.#filmsContainer;
  #buttonContainer = this.#filmsContainer;

  #userProfileComponent = new UserProfileView();
  #sortComponent = new SortView();
  //#filterComponent = new FilterView();
  #footerStatsComponent = new FooterStatsView();
  #noFilmsComponent = new NoFilmsView();
  #filmsListComponent = new FilmsListView();

  #films = [];

  /* constructor(boardContainer) {
    this.#boardContainer = boardContainer;
  } */

  init = (films) => {
    this.#films = [...films];

    render(this.#header, this.#userProfileComponent, RenderPosition.BEFOREEND);
    this.#renderSort();
    this.#renderFilter();
    render(this.#footer, this.#footerStatsComponent, RenderPosition.BEFOREEND);

    this.#renderFilms();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderMovies в main.js
  }

  #renderFilter = () => {
    render(this.#main, new FilterView(this.#films), RenderPosition.AFTERBEGIN);
  }

  #renderSort = () => {
    render(this.#main, this.#sortComponent, RenderPosition.AFTERBEGIN);
    // Метод для рендеринга сортировки
  }

  #renderFilmCard = (film) => {
    const filmCardComponent = new FilmCardView(film);
    const filmPopupComponent = new FilmPopupView(film);

    const closePopup = (popupElement) => {
      this.#footer.parentElement.classList.remove('hide-overflow');
      this.#footer.parentElement.removeChild(popupElement);
    };

    const renderPopup = () => {
      const prevPopup = this.#footer.parentElement.querySelector('.film-details');
      if (prevPopup) {
        closePopup(prevPopup);
      }
      this.#footer.parentElement.classList.add('hide-overflow');
      this.#footer.parentElement.appendChild(filmPopupComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup(filmPopupComponent.element);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmCardComponent.setFilmCardClickHandler(() => {
      renderPopup();
      document.addEventListener('keydown', onEscKeyDown);
    });

    filmPopupComponent.setCloseButtonClickHandler(() => {
      closePopup(filmPopupComponent.element);
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this.#filmsListComponent, filmCardComponent, RenderPosition.BEFOREEND);
    // Метод, куда уйдёт логика по созданию и рендерингу компонетов фильма,
    // текущая функция renderFilmCard в main.js
  }

  #renderNoFilms = () => {
    render(this.#messageContainer, this.#noFilmsComponent, RenderPosition.AFTERBEGIN);
    // Метод для рендеринга заглушки
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
    // Метод, куда уйдёт логика по отрисовке кнопки допоказа карточек фильмов,
    // сейчас в main.js является частью renderMovies
  }

  #renderFilmsListContainer = () => {
    render(this.#filmsContainer, this.#filmsListComponent, RenderPosition.BEFOREEND);
  }

  #renderFilms = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
    } else {
      //const filmsListContainer = main.querySelector('.films-list__container');
      this.#renderFilmsListContainer();
      for (let i = 0; i < Math.min(this.#films.length, MOVIES_COUNT_PER_STEP); i++) {
        this.#renderFilmCard(this.#films[i]);
      }

      if (this.#films.length > MOVIES_COUNT_PER_STEP) {
        this.#renderShowMoreButton();
      }
    }
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderMovies в main.js
  }
}
