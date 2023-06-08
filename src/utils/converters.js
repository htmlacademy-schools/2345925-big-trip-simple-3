import dayjs from 'dayjs';

const EVENT_DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'H:mm';
const FORM_DATE_FORMAT = 'DD/MM/YY';
const BASIC_DATE_FORMAT = 'DD/MM/YY HH:mm';

export const convertToEventDateTime = (date) => date.substring(0, date.indexOf('T'));
export const convertToEventDate = (date) => dayjs(date).format(EVENT_DATE_FORMAT);
export const convertToDateTime = (date) => date.substring(0, date.indexOf('.'));
export const convertToTime = (date) => dayjs(date).format(TIME_FORMAT);
export const convertToUpperCase = (type) => type.charAt(0).toUpperCase() + type.slice(1);
export const convertToFormDate = (date) => dayjs(date).format(FORM_DATE_FORMAT);
export const isDateValid = (date) => dayjs(date).isBefore(dayjs(), 'D') || dayjs(date).isSame(dayjs(), 'D');
export const compareDates = (a, b) => dayjs(a).toDate() - dayjs(b).toDate();
export const convertToBasicime = (date) => dayjs(date).format(BASIC_DATE_FORMAT);
export const compareTime = (a, b) => {
  const aDate = dayjs(a);
  const bDate = dayjs(b);

  if (aDate.hour() > bDate.hour()) {
    return bDate.hour() - aDate.hour();
  }

  return aDate.minute() - bDate.minute();
};
