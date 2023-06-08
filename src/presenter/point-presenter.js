import TripEventFormView from '../view/trip-events-form-view';
import TripEvent from '../view/trip-event-view';
import {remove, render, replace} from '../framework/render';
import {UpdateType, UserAction} from '../utils/const';
import {compareDates} from '../utils/converters';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export class TripEventPresenter {
  #container;
  #tripEvent;
  #destinations;
  #offers;

  #tripEventFormComponent;

  #tripEventComponent;

  #handleModeChange;
  #onDataChange;

  #mode = Mode.DEFAULT;


  constructor({
    container,
    tripEvent,
    handleModeChange,
    destinations,
    offers,
    onDataChange
  }) {
    this.#tripEvent = tripEvent;
    this.#container = container;
    this.#handleModeChange = handleModeChange;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onDataChange = onDataChange;
  }

  #closeEditFormOnEscapeKey = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.#replaceFormToEvent();
    }
  };

  #replacePointToForm = () => {
    replace(this.#tripEventFormComponent, this.#tripEventComponent);
    document.addEventListener('keydown', this.#closeEditFormOnEscapeKey);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToEvent = () => {
    replace(this.#tripEventComponent, this.#tripEventFormComponent);
    document.removeEventListener('keydown', this.#closeEditFormOnEscapeKey);
    this.#mode = Mode.DEFAULT;
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#tripEventFormComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#tripEventFormComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#tripEventFormComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#tripEventFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#tripEventFormComponent.shake(resetFormState);
  };


  init = (tripEvent = this.#tripEvent, destinations = this.#destinations, offers = this.#offers) => {
    const prevTripEventComponent = this.#tripEventComponent;
    const prevTripEventFormComponent = this.#tripEventFormComponent;

    this.#tripEventFormComponent = new TripEventFormView({
      tripEvent: tripEvent,
      destinations: destinations,
      offers: offers,
      onSave: (update) => {
        this.#handleSave(update);
      },
      onReset: () => {
        this.#replaceFormToEvent();
      },
      onDelete: (update) => {
        this.#handleDeleteClick(update);
      }
    });

    this.#tripEventComponent = new TripEvent({
      tripEvent: tripEvent,
      destinations: destinations,
      offers: offers,
      onRollupClick: () => {
        this.#replacePointToForm();
      }
    });


    if (!prevTripEventComponent || !prevTripEventFormComponent) {
      render(this.#tripEventComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripEventComponent, prevTripEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#tripEventComponent, prevTripEventFormComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevTripEventComponent);
    remove(prevTripEventFormComponent);
  };

  destroy = () => {
    remove(this.#tripEventComponent);
    remove(this.#tripEventFormComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#tripEventFormComponent.reset(this.#tripEvent, this.#offers);
      this.#replaceFormToEvent();
    }
  };

  #handleSave = (update) => {
    const isMinorUpdate = compareDates(this.#tripEvent.dateFrom, update.dateFrom) !== 0 || this.#tripEvent.basePrice !== update.basePrice;
    this.#onDataChange(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
  };

  #handleDeleteClick = (update) => {
    this.#onDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      update,
    );
  };
}
