import BaseView from './base-view.js';
import {getRandomOffers} from '../mock/offer';
import {convertToDateTime, convertToEventDate, convertToEventDateTime, convertToTime} from '../utils/converters';
import {randomDestinations} from '../mock/destination';

const createOffersTemplate = (offers) => offers.map((offer) => `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
  `).join('');

const createTripEventTemplate = (point) => {
  const {destination, offers, type} = point;
  const offersArray = getRandomOffers()
    .find((e) => (e.type === type))['offers']
    .filter((e) => (e.id in offers));
  const eventDate = convertToEventDate(point.dateFrom);
  const eventStartDateTime = convertToEventDateTime(point.dateFrom);
  const eventStartTime = convertToTime(point.dateFrom);
  const eventEndDateTime = convertToDateTime(point.dateTo);
  const eventEndTime = convertToTime(point.dateTo);
  const eventPrice = point.basePrice;
  const offersTemplate = createOffersTemplate(offersArray);
  const eventDateTime = convertToEventDateTime(point.dateFrom);
  return `<li class="trip-events__item">
    <div class="event">
        <time class="event__date" datetime="${eventDateTime}">${eventDate}</time>
        <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${randomDestinations.getDestination(destination).name}</h3>
        <div class="event__schedule">
            <p class="event__time">
                <time class="event__start-time" datetime=${eventStartDateTime}>${eventStartTime}</time>
                    &mdash;
                <time class="event__end-time" datetime="${eventEndDateTime}">${eventEndTime}</time>
            </p>
        </div>
        <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${eventPrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
            ${offersTemplate}
        </ul>
        <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
        </button>
    </div>
  </li>`;
};
class TripEventView extends BaseView {
  constructor({tripPoint}) {
    super();
    this.tripPoint = tripPoint;
  }

  getTemplate() {
    return createTripEventTemplate(this.tripPoint);
  }
}


export default TripEventView;
