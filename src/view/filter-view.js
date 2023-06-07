import AbstractView from '../framework/view/abstract-view';

const createFilter = (filterName) => `
    <div class="trip-filters__filter">
        <input id="filter-${filterName.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterName.toLowerCase()}">
        <label class="trip-filters__filter-label" for="filter-${filterName.toLowerCase()}">${filterName}</label>
    </div>
`;


const createFilterTemplate = (filters) =>
  `<form class="trip-filters" action="#" method="get">
    ${filters.map((filterName) => createFilter(filterName)).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;


class FiltersView extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
export default FiltersView;
