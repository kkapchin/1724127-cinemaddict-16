import AbstractView from './abstract-view';

const createShowMoreButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);

export default class ShowMoreButtonView extends AbstractView {
  get template() {
    return createShowMoreButtonTemplate();
  }

  setShowMoreButtonClick = (callback) => {
    this.callback.showMoreButtonClick = callback;
    this.element.addEventListener('click', this.#showMoreButtonClickHandler);
  }

  #showMoreButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.callback.showMoreButtonClick();
  }
}
