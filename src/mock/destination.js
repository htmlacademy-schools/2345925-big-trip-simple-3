import {generateRandomInt, generateRandomImageUrl} from '../utils/random';

const names = ['Chamonix', 'Berlin', 'Moscow', 'Tver', 'NY', 'Petrozavodsk'];


const generatePicture = () => ({
  src: generateRandomImageUrl(),
  description: 'something'
});

export const generateDestination = (id) => ({
  id,
  description: 'something something',
  name: names[generateRandomInt(0, names.length - 1)],
  pictures:
    Array.from({length: generateRandomInt(2, 5)}, generatePicture)
});


export const randomDestinations = (() => {
  const destinations = [];

  for (let i = 0; i <= 10; i++) {
    destinations.push(generateDestination(i));
  }

  return {
    getDestination: (id) => destinations[id],
    getAllDestinations: () => destinations,
  };
})();
