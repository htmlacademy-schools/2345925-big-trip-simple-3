import AbstractView from '../framework/view/abstract-view';

const createFilter = (filter, current) => `
    <div class="trip-filters__filter">
        <input
            id="filter-${filter.type.toLowerCase()}"
            class="trip-filters__filter-input visually-hidden"
            type="radio"
            name="trip-filter"
            value="${filter.type.toLowerCase()}"
            ${filter === current ? 'checked' : ''}
        >
        <label class="trip-filters__filter-label" for="filter-${filter.type.toLowerCase()}">${filter.type}</label>
    </div>
`;


const createFilterTemplate = (filters) =>
  `<form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => createFilter(filter)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;


class FiltersView extends AbstractView {
  #filters;
  #current;
  constructor({filters, current, onFilterChange}) {
    super();
    this.#filters = filters;
    this.#current = current;
    this._callback.onFilterChange = onFilterChange;

    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.onFilterChange(evt.target.value);
  };
}

export default FiltersView;
