import BaseView from './base-view';

export default class NoPointsView extends BaseView{
  #element = null;

  constructor() {
    super();
  }

  get template() {
    return '<p class="trip-events__msg">Click New Event to create your first point</p>';
  }

  removeElement() {
    this.#element = null;
  }

}
