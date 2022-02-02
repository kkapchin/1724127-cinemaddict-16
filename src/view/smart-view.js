import AbstractView from './abstract-view';

export default class SmartView extends AbstractView {
  #data = {};

  updateData = (update, justDataUpdating) => {
    if (!update) {
      return;
    }

    this.#data = {...this.#data, ...update};

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  restoreHandlers = () => {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }
}
