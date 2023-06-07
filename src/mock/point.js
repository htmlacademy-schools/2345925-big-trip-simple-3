import {generateRandomDate, generateRandomInt} from '../utils/random';

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const generateRandomType = () => POINT_TYPES[generateRandomInt(0, POINT_TYPES.length)];

export const generateRandomPoint = () => ({
  'basePrice': generateRandomInt(300, 6666),
  'id': generateRandomInt(0, 100),
  'dateFrom': generateRandomDate(),
  'dateTo': generateRandomDate(),
  'destination': generateRandomInt(0, 9),
  'offers': [1, 3, 5],
  'type': generateRandomType()
});
