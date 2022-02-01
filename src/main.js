import { getMovie } from './mock/movies';
import { render, RenderPosition } from './utils/render';
import FooterStatsView from './view/footer-statistics';
import FilterView from './view/filter';
import ShowMoreButtonView from './view/show-more-button';
import SortView from './view/sort';
import UserProfileView from './view/user-profile';
import FilmCardView from './view/film-card';
import FilmPopupView from './view/film-popup';
import NoFilmsView from './view/no-films';
import FilmsListView from './view/films-list';

const MOVIES_COUNT = 17;
const MOVIES_COUNT_PER_STEP = 5;

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');
const filmsListElement = main.querySelector('.films-list');
const films = Array.from({ length: MOVIES_COUNT }, getMovie);

const renderFilmCard = (container, movie) => {
  const filmCardComponent = new FilmCardView(movie);
  const filmPopupComponent = new FilmPopupView(movie);

  const closePopup = (popupElement) => {
    footer.parentElement.classList.remove('hide-overflow');
    footer.parentElement.removeChild(popupElement);
  };

  const renderPopup = () => {
    const prevPopup = footer.parentElement.querySelector('.film-details');
    if(prevPopup) {
      closePopup(prevPopup);
    }
    footer.parentElement.classList.add('hide-overflow');
    footer.parentElement.appendChild(filmPopupComponent.element);
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

  render(container, filmCardComponent.element, RenderPosition.BEFOREEND);
};

render(header, new UserProfileView().element, RenderPosition.BEFOREEND);
render(main, new SortView().element, RenderPosition.AFTERBEGIN);
render(main, new FilterView(films).element, RenderPosition.AFTERBEGIN);
render(footer, new FooterStatsView().element, RenderPosition.BEFOREEND);

const renderMovies = (moviesContainer, movies) => {
  const messageContainer = moviesContainer;
  const buttonContainer = moviesContainer;
  if (movies.length === 0) {
    render(messageContainer, new NoFilmsView().element, RenderPosition.AFTERBEGIN);
  } else {

    render(moviesContainer, new FilmsListView().element, RenderPosition.BEFOREEND);
    const filmsListContainer = main.querySelector('.films-list__container');

    for (let i = 0; i < Math.min(movies.length, MOVIES_COUNT_PER_STEP); i++) {
      renderFilmCard(filmsListContainer, movies[i]);
    }

    if (movies.length > MOVIES_COUNT_PER_STEP) {
      const showMoreButton = new ShowMoreButtonView();
      let renderedMoviesCount = MOVIES_COUNT_PER_STEP;

      render(buttonContainer, showMoreButton.element, RenderPosition.BEFOREEND);

      showMoreButton.setShowMoreButtonClick(() => {
        movies
          .slice(renderedMoviesCount, renderedMoviesCount + MOVIES_COUNT_PER_STEP)
          .forEach((movie) => renderFilmCard(filmsListContainer, movie));

        renderedMoviesCount += MOVIES_COUNT_PER_STEP;

        if (renderedMoviesCount >= movies.length) {
          buttonContainer.removeChild(showMoreButton.element);
        }
      });
    }
  }
};

renderMovies(filmsListElement, films);
