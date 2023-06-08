import AbstractView from '../framework/view/abstract-view.js';

function createPreloaderTemplate() {
  return ('<p class="trip-events__msg">Loading...</p>');
}

export default class PreloaderView extends AbstractView {
  get template() {
    return createPreloaderTemplate();
  }
}
