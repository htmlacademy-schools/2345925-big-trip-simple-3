import AbstractView from '../framework/view/abstract-view';

const createTripSortingBlock = (sort) => `<div class="trip-sort__item  trip-sort__item--${sort.toLowerCase()}">
      <input id="sort-${sort.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort.toLowerCase()}" checked>
      <label class="trip-sort__btn" for="sort-${sort.toLowerCase()}">${sort}</label>
    </div>`;


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

  get template() {
    return createTripEventsSortingTemplate(this.#sorts);
  }
}

export default TripEventsSortingView;
