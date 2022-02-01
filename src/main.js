import { getMovie } from './mock/movies';
import { render, RenderPosition } from './utils/render';
import FooterStatsView from './view/footer-statistics';
import FilterView from './view/filter';
import ShowMoreButtonView from './view/show-more-button';
import SortView from './view/sort';
import UserProfileView from './view/user-profile';
import FilmCardView from './view/film-card';
//import FilmPopupView from './view/film-popup';

const MOVIES_COUNT = 17;
const MOVIES_COUNT_PER_STEP = 5;

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer__statistics');
const moviesContainer = main.querySelector('.films-list__container');
const buttonContainer = main.querySelector('.films-list');
const movies = Array.from({length: MOVIES_COUNT}, getMovie);

render(header, new UserProfileView().element, RenderPosition.BEFOREEND);
render(main, new SortView().element, RenderPosition.AFTERBEGIN);
render(main, new FilterView(movies).element, RenderPosition.AFTERBEGIN);
render(footer, new FooterStatsView().element, RenderPosition.AFTERBEGIN);

for (let i = 0; i < Math.min(movies.length, MOVIES_COUNT_PER_STEP); i++) {
  render(moviesContainer, new FilmCardView(movies[i]).element, RenderPosition.BEFOREEND);
}

if (movies.length > MOVIES_COUNT_PER_STEP) {
  let renderedMoviesCount = MOVIES_COUNT_PER_STEP;

  render(buttonContainer, new ShowMoreButtonView().element, RenderPosition.BEFOREEND);

  const showMoreButton = buttonContainer.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    movies
      .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_COUNT_PER_STEP)
      .forEach((movie) => render(moviesContainer, new FilmCardView(movie).element, RenderPosition.BEFOREEND));

    renderedMoviesCount += MOVIES_COUNT_PER_STEP;

    if (renderedMoviesCount >= movies.length) {
      showMoreButton.remove();
    }
  });
}

//renderElement(footer, new FilmPopupView(movies[0]).element, RenderPosition.AFTERBEGIN);
