import TripEventsFormView from '../view/trip-events-form-view';
import TripEvent from '../view/trip-event-view';
import {remove, render, replace} from '../framework/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export class PointPresenter {
  #container = null;
  #tripPoint = null;

  #tripPointFormComponent = null;

  #tripPointComponent = null;

  #handleChange = null;

  #mode = Mode.DEFAULT;

  constructor(container, tripPoint, {handleChange}) {
    this.#tripPoint = tripPoint;
    this.#container = container;
    this.#handleChange = handleChange;
  }

  #closeEditFormOnEscapeKey(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.#replacePointToForm();
      document.body.removeEventListener('keydown', this.#closeEditFormOnEscapeKey);
    }
  }

  #replacePointToForm() {
    replace(this.#tripPointFormComponent, this.#tripPointComponent);
    document.addEventListener('keydown', this.#closeEditFormOnEscapeKey);
    if(this.#handleChange !== null || typeof this.#handleChange !== 'undefined') {
      this.#handleChange();
    }
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#tripPointComponent, this.#tripPointFormComponent);
    document.removeEventListener('keydown', this.#closeEditFormOnEscapeKey);
    this.#mode = Mode.DEFAULT;
  }


  init() {
    const prevTripPointComponent = this.#tripPointComponent;
    const prevTripPointFormComponent = this.#tripPointFormComponent;

    this.#tripPointFormComponent = new TripEventsFormView({
      tripPoint: this.#tripPoint
    });

    this.#tripPointComponent = new TripEvent({
      tripPoint: this.#tripPoint
    });

    this.#tripPointComponent.addEventListener('.event__rollup-btn', 'click', () => {
      this.#replacePointToForm();
      document.body.addEventListener('keydown', this.#closeEditFormOnEscapeKey);
    });

    this.#tripPointFormComponent.addEventListener('.event__save-btn', 'click', (evt) => {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.body.removeEventListener('keydown', this.#closeEditFormOnEscapeKey);
    });

    this.#tripPointFormComponent.addEventListener('.event__reset-btn','click', () => {
      this.#replaceFormToPoint();
      document.body.removeEventListener('keydown', this.#closeEditFormOnEscapeKey);
    });

    if (prevTripPointComponent === null || prevTripPointFormComponent === null) {
      render(this.#tripPointComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripPointComponent, prevTripPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripPointFormComponent, prevTripPointFormComponent);
    }

    remove(prevTripPointComponent);
    remove(prevTripPointFormComponent);
  }

  destroy() {
    remove(this.#tripPointComponent);
    remove(this.#tripPointFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }
}