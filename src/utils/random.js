
export const generateRandomInt = (from, to) => {
  if(from > to){
    return 0;
  }
  return Math.floor(Math.random() * (to - from)) + from;
};

export const generateRandomDate = (maxDate = Date.now()) => {
  const timestamp = Math.floor(Math.random() * maxDate);
  return new Date(timestamp).toISOString();
};

export const generateRandomImageUrl = () =>
  `http://picsum.photos/248/152?r=${generateRandomInt(0, 1000)}`;

