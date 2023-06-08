import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../utils/const';

const createTripSortingBlock = (sortName) => (
  `
    <div class="trip-sort__item  trip-sort__item--${sortName.toLowerCase()}">
      <input
        id="sort-${sortName.toLowerCase()}"
        class="trip-sort__input visually-hidden"
        type="radio" name="trip-sort"
        value="sort-${sortName.toLowerCase()}"
        ${sortName === SortType.DAY ? 'checked' : ''}
      >
      <label class="trip-sort__btn" for="sort-${sortName.toLowerCase()}" data-sort-type="${sortName}">${sortName}</label>
    </div>`
);


const createTripEventsSortingTemplate = (sorts) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.keys(sorts).map((sort) => createTripSortingBlock(sort)).join('')}
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
