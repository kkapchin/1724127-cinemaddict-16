import { render } from './utils/render';
import { createFilmsListTemplate } from './view/films-list';
import { createFooterStatsTemplate } from './view/footer-statistics';
import { createNavigationTemplate } from './view/navigation';
import { createSortTemplate } from './view/sort';
import { createUserProfileTemplate } from './view/user-profile';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer__statistics');


render(header, createUserProfileTemplate(), 'beforeend');
render(main, createSortTemplate(), 'afterbegin');
render(main, createNavigationTemplate(), 'afterbegin');
render(main, createFilmsListTemplate(), 'beforeend');
render(footer, createFooterStatsTemplate(), 'afterbegin');
