import {compareDates, compareTime} from './converters';

export const sortByDay = (a, b) => compareDates(a.date_from, b.date_from);
export const sortByTime = (a, b) => compareTime(a.date_from, b.date_from);
export const sortByPrice = (a, b) => b.base_price - a.base_price;
export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};
