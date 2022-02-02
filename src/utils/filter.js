import { FilterType } from './render';

export const filter = {
  [FilterType.DEFAULT]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist === true),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched === true),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite === true),
};
