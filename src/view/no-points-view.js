import AbstractView from '../framework/view/abstract-view';

export default class NoPointsView extends AbstractView{
  #element = null;

  constructor() {
    super();
  }

  get template() {
    return '<p class="trip-events__msg">Click New Event to create your first point</p>';
  }

}
