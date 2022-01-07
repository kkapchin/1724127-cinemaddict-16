import { getMovies } from './mock/movies';
import { render } from './utils/render';
import { createFilmsListTemplate } from './view/films-list';
import { createFooterStatsTemplate } from './view/footer-statistics';
import { createNavigationTemplate } from './view/navigation';
import { createSortTemplate } from './view/sort';
import { createUserProfileTemplate } from './view/user-profile';

const MOVIES_COUNT = 15;
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer__statistics');
const movies = getMovies(MOVIES_COUNT);

render(header, createUserProfileTemplate(), 'beforeend');
render(main, createSortTemplate(), 'afterbegin');
render(main, createNavigationTemplate(), 'afterbegin');
render(main, createFilmsListTemplate(movies), 'beforeend');
render(footer, createFooterStatsTemplate(), 'afterbegin');
