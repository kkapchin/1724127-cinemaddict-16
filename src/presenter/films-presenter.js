import FilterView from '../view/filter';
import FooterStatsView from '../view/footer-statistics';
import NoFilmsView from '../view/no-films';
import SortView from '../view/sort';
import UserProfileView from '../view/user-profile';

export default class FilmsPresenter {
  #header = document.querySelector('.header');
  #main = document.querySelector('.main');
  #footer = document.querySelector('.footer');
  #filmsContainer = this.#main.querySelector('.films-list');

  #userProfileComponent = new UserProfileView();
  #sortComponent = new SortView();
  #filterComponent = new FilterView();
  #footerStatsComponent = new FooterStatsView();
  #noFilmsComponent = new NoFilmsView();

  #films = [];

  /* constructor(boardContainer) {
    this.#boardContainer = boardContainer;
  } */

  init = (films) => {
    this.#films = [...films];
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderMovies в main.js
  }

  #renderSort = () => {
    // Метод для рендеринга сортировки
  }

  #renderFilmCard = () => {
    // Метод, куда уйдёт логика по созданию и рендерингу компонетов фильма,
    // текущая функция renderFilmCard в main.js
  }

  #renderNoFilms = () => {
    // Метод для рендеринга заглушки
  }

  #renderShowMoreButton = () => {
    // Метод, куда уйдёт логика по отрисовке кнопки допоказа карточек фильмов,
    // сейчас в main.js является частью renderMovies
  }

  #renderMovies = () => {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderMovies в main.js
  }
}
