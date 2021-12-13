import { createFilmCardTemplate } from './film-card';
import { createShowMoreBtnTemplate } from './show-more-button';

export const createFilmsListTemplate = () => (
  `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        <div class="films-list__container">
          ${createFilmCardTemplate()}
          ${createFilmCardTemplate()}
          ${createFilmCardTemplate()}
          ${createFilmCardTemplate()}
          ${createFilmCardTemplate()}
        </div>
        ${createShowMoreBtnTemplate()}
  </section>`
);
