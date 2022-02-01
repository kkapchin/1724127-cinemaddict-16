import { getMovie } from './mock/movies';
import { render, RenderPosition } from './utils/render';
import FooterStatsView from './view/footer-statistics';
import FilterView from './view/filter';
import ShowMoreButtonView from './view/show-more-button';
import SortView from './view/sort';
import UserProfileView from './view/user-profile';
import FilmCardView from './view/film-card';
import FilmPopupView from './view/film-popup';

const MOVIES_COUNT = 17;
const MOVIES_COUNT_PER_STEP = 5;

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const moviesContainer = main.querySelector('.films-list__container');
const buttonContainer = main.querySelector('.films-list');
const movies = Array.from({length: MOVIES_COUNT}, getMovie);

const renderFilmCard = (container, movie) => {
  const filmCardComponent = new FilmCardView(movie);
  const filmPopupComponent = new FilmPopupView(movie);
  const renderPopup = () => {
    footer.parentElement.classList.add('hide-overflow');
    footer.parentElement.appendChild(filmPopupComponent.element);
  };

  const closePopup = () => {
    footer.parentElement.classList.remove('hide-overflow');
    footer.parentElement.removeChild(filmPopupComponent.element);
  };

  filmCardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
    renderPopup();
  });

  filmPopupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
    closePopup();
  });

  render(container, filmCardComponent.element, RenderPosition.BEFOREEND);
};

render(header, new UserProfileView().element, RenderPosition.BEFOREEND);
render(main, new SortView().element, RenderPosition.AFTERBEGIN);
render(main, new FilterView(movies).element, RenderPosition.AFTERBEGIN);
render(footer, new FooterStatsView().element, RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(movies.length, MOVIES_COUNT_PER_STEP); i++) {
  renderFilmCard(moviesContainer, movies[i]);
}

if (movies.length > MOVIES_COUNT_PER_STEP) {
  let renderedMoviesCount = MOVIES_COUNT_PER_STEP;

  render(buttonContainer, new ShowMoreButtonView().element, RenderPosition.BEFOREEND);

  const showMoreButton = buttonContainer.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_COUNT_PER_STEP)
      .forEach((movie) => renderFilmCard(moviesContainer, movie));

    renderedMoviesCount += MOVIES_COUNT_PER_STEP;

    if (renderedMoviesCount >= movies.length) {
      showMoreButton.remove();
    }
  });
}
