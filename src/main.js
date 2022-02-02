import { getMovie } from './mock/movies';
import FilmsPresenter from './presenter/films-presenter';
import { render, RenderPosition } from './utils/render';
import FooterStatsView from './view/footer-statistics';
import UserProfileView from './view/user-profile';

const MOVIES_COUNT = 17;

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

const films = Array.from({ length: MOVIES_COUNT }, getMovie);
const userProfileComponent = new UserProfileView();
const footerStatsComponent = new FooterStatsView();

render(header, userProfileComponent, RenderPosition.BEFOREEND);
render(footer, footerStatsComponent, RenderPosition.BEFOREEND);

const filmsPresenter = new FilmsPresenter(main, footer);
filmsPresenter.init(films);
