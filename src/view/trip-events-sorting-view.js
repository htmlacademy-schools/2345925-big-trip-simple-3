import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../utils/trip-points';


const createTripSortingBlock = (name) => (
  `
    <div class="trip-sort__item  trip-sort__item--${name.toLowerCase()}">
      <input
        id="sort-${name.toLowerCase()}"
        class="trip-sort__input visually-hidden"
        type="radio" name="trip-sort"
        value="sort-${name.toLowerCase()}"
        ${name === SortType.DAY ? 'checked' : ''}
      >
      <label class="trip-sort__btn" for="sort-${name.toLowerCase()}" data-sort-type="${name}">${name}</label>
    </div>`
);


const createTripEventsSortingTemplate = (sorts) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sorts.map((sort) => createTripSortingBlock(sort)).join('')}
  </form>
`;

class TripEventsSortingView extends AbstractView {
  #sorts = [];

  constructor({sorts}) {
    super();
    this.#sorts = sorts;
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

  get template() {
    return createTripEventsSortingTemplate(this.#sorts);
  }
}

export default TripEventsSortingView;
