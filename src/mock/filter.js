import {isDateValid} from '../utils/converters';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
};

const filter = {
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => isDateValid(tripPoint.dateFrom)),
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
};


export const generateFilter = () =>
  Object.keys(filter);
