import { getMovie } from './mock/movies';
import { render, renderElement, RenderPosition } from './utils/render';
import { createFilmCardTemplate } from './view/film-card';
//import { createFilmPopupTemplate } from './view/film-popup';
import FooterStatsView from './view/footer-statistics';
import { createNavigationTemplate } from './view/navigation';
import ShowMoreButtonView from './view/show-more-button';
import SortView from './view/sort';
import UserProfileView from './view/user-profile';

const MOVIES_COUNT = 17;
const MOVIES_COUNT_PER_STEP = 5;

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer__statistics');
const moviesContainer = main.querySelector('.films-list__container');
const buttonContainer = main.querySelector('.films-list');
const movies = Array.from({length: MOVIES_COUNT}, getMovie);

renderElement(header, new UserProfileView().element, RenderPosition.BEFOREEND);
renderElement(main, new SortView().element, RenderPosition.AFTERBEGIN);
render(main, createNavigationTemplate(movies), RenderPosition.AFTERBEGIN);
renderElement(footer, new FooterStatsView().element, RenderPosition.AFTERBEGIN);

for (let i = 0; i < Math.min(movies.length, MOVIES_COUNT_PER_STEP); i++) {
  render(moviesContainer, createFilmCardTemplate(movies[i]), RenderPosition.BEFOREEND);
}

if (movies.length > MOVIES_COUNT_PER_STEP) {
  let renderedMoviesCount = MOVIES_COUNT_PER_STEP;

  renderElement(buttonContainer, new ShowMoreButtonView().element, RenderPosition.BEFOREEND);

  const showMoreButton = buttonContainer.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_COUNT_PER_STEP)
      .forEach((movie) => render(moviesContainer, createFilmCardTemplate(movie), RenderPosition.BEFOREEND));

    renderedMoviesCount += MOVIES_COUNT_PER_STEP;

    if (renderedMoviesCount >= movies.length) {
      showMoreButton.remove();
    }
  });
}

//render(footer, createFilmPopupTemplate(movies[0]), RenderPosition.AFTERBEGIN);
