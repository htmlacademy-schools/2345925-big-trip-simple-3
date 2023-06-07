import { render } from '../render.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import TripEventsSortingView from '../view/trip-events-sorting-view.js';
import TripEventsFormView from '../view/trip-events-form-view.js';
import TripEvent from '../view/trip-event-view.js';
import NoPointsView from '../view/no-points-view';
import {replace} from '../framework/render';

class TripPresenter {
  #tripContainer = null;
  #tripPointsModel = null;
  #tripEventsListComponent = new TripEventsListView();
  #tripEmptyListMessage = new NoPointsView();
  #tripPoints = [];

  constructor(container, tripPointsModel) {
    this.#tripContainer = container;
    this.#tripPointsModel = tripPointsModel;
    this.#tripPoints = [...this.#tripPointsModel.getTripPoints()];
  }


  #renderTripPoint = (tripPoint) => {
    const tripPointComponent = new TripEvent({tripPoint});
    const tripPointFormComponent = new TripEventsFormView({tripPoint});

    const replacePointToForm = () => {
      replace(tripPointFormComponent, tripPointComponent);
    };

    const replaceFormToPoint = () => {
      replace(tripPointComponent, tripPointFormComponent);
    };

    const closeEditFormOnEscapeKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        replaceFormToPoint();
        document.body.removeEventListener('keydown', closeEditFormOnEscapeKey);
      }
    };

    tripPointComponent.addEventListener('.event__rollup-btn', 'click', () => {
      replacePointToForm();
      document.body.addEventListener('keydown', closeEditFormOnEscapeKey);
    });

    tripPointFormComponent.addEventListener('.event__save-btn','click', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.body.removeEventListener('keydown', closeEditFormOnEscapeKey);
    });

    tripPointFormComponent.addEventListener('.event__reset-btn', 'click', () => {
      replaceFormToPoint();
      document.body.removeEventListener('keydown', closeEditFormOnEscapeKey);
    });

    render(tripPointComponent, this.#tripEventsListComponent.element);
  };

  init() {
    render(new TripEventsSortingView(), this.#tripContainer);
    render(this.#tripEventsListComponent, this.#tripContainer);
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripPoint(this.#tripPoints[i]);
    }
    if(this.#tripPoints.length === 0){
      render(this.#tripEmptyListMessage, this.#tripContainer);
    }
  }
}

export default TripPresenter;
