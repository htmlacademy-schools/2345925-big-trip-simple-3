import {render} from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsSortingView from '../view/trip-events-sorting-view.js';
import NoPointsView from '../view/no-points-view';
import {generateSorts} from '../mock/sort';
import {PointPresenter} from './point-presenter';
import {sortByDay, sortByPrice, sortByTime, SortType} from '../utils/trip-points';

class TripPresenter {
  #tripContainer = null;
  #tripPointsModel = null;
  #tripEventsListComponent = new TripEventsListView();

  #tripPoints = [];
  #sorts = generateSorts();
  #pointPresenter = new Map();
  #sortComponent = new TripEventsSortingView({sorts: this.#sorts});

  #currentSortType = SortType.DAY;
  constructor(container, tripPointsModel) {
    this.#tripContainer = container;
    this.#tripPointsModel = tripPointsModel;
    this.#tripPoints = [...this.#tripPointsModel.getTripPoints()];
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    //console.log(sortType);
    this.#sortTrips(sortType);
    this.#renderSortingView();
    this.#clearEventsList();
    this.#renderEventsList();
  };

  #handleChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderTripPoint = (tripPoint) => {
    const container = this.#tripEventsListComponent.element;
    const pointPresenter = new PointPresenter(container, tripPoint, {handleChange: this.#handleChange});
    pointPresenter.init();
    this.#pointPresenter.set(tripPoint.id, pointPresenter);
  };

  #renderSortingView = () => {
    render(this.#sortComponent, this.#tripContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderEventsList = () => {
    render(this.#tripEventsListComponent, this.#tripContainer);
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripPoint(this.#tripPoints[i]);
    }
  };

  #clearEventsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };


  #sortTrips = (sortType) => {
    //console.log(sortType);
    switch (sortType) {
      case SortType.PRICE:
        this.#tripPoints.sort(sortByPrice);
        break;
      case SortType.TIME:
        this.#tripPoints.sort(sortByTime);
        break;
      case SortType.DAY:
        this.#tripPoints.sort(sortByDay);
    }
    this.#currentSortType = sortType;
  };

  init() {
    this.#renderSortingView();

    if (this.#tripPoints.length === 0) {
      render(new NoPointsView(), this.#tripContainer);
      return;
    }
    this.#renderEventsList();
  }
}

export default TripPresenter;
