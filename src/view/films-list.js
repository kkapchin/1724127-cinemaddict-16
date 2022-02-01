import { createFilmCardTemplate } from './film-card';
import { createShowMoreBtnTemplate } from './show-more-button';

export const createFilmsListTemplate = (movies) => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
          ${movies.map((movie) => createFilmCardTemplate(movie)).join('')}
        </div>
        ${createShowMoreBtnTemplate()}
  </section>`
);
