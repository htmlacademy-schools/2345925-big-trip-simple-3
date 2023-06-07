import {render} from '../framework/render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsSortingView from '../view/trip-events-sorting-view.js';
import NoPointsView from '../view/no-points-view';
import {generateSorts} from '../mock/sort';
import {PointPresenter} from './point-presenter';

class TripPresenter {
  #tripContainer = null;
  #tripPointsModel = null;
  #tripEventsListComponent = new TripEventsListView();

  #tripPoints = [];
  #sorts = generateSorts();
  #pointPresenter = new Map();

  constructor(container, tripPointsModel) {
    this.#tripContainer = container;
    this.#tripPointsModel = tripPointsModel;
    this.#tripPoints = [...this.#tripPointsModel.getTripPoints()];
  }

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
    render(new TripEventsSortingView({sorts: this.#sorts}), this.#tripContainer);
  };

  #renderEventsList = () => {
    render(this.#tripEventsListComponent, this.#tripContainer);
  };

  init() {
    this.#renderSortingView();
    this.#renderEventsList();

    if (this.#tripPoints.length === 0) {
      render(new NoPointsView(), this.#tripContainer);
    }
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripPoint(this.#tripPoints[i]);
    }
  }
}

export default TripPresenter;
