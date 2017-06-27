import * as moment from 'moment';
import Random = require('random-js');

const randomEngine = Random.engines.mt19937().autoSeed();

export const rollOne = (faces: number = 6) => {
  return Random.die(faces)(randomEngine);
};

export const roll = (faces: number, quantity: number = 1): IRollResponse => {
  const rolls = new Array(quantity).fill(0).map(() => (rollOne(faces)));
  const rollResponse = {
    date: moment(),
    roll: `${quantity}d${faces}`,
    values: rolls,
    total: rolls.reduce((prev, curr) => (prev + curr)),
  };
  console.info(`[util] rolled ${rollResponse.roll} to get ${rollResponse.total}`, rollResponse.values);
  return rollResponse;
};

// export const rollDropLow = (faces: number, quantity: number = 1, dropQuantity: number = 1): IRollResponse => {
//   const roll = rollSeveral(faces, quantity);
//   const rollResponse = {
//     roll: `${quantity}d${faces}`,
//     rolls,
//     total: rolls.reduce((prev, curr) => (prev + curr)),
//   };
//   console.info(`[util] rolled ${rollResponse.roll} to get ${rollResponse.total}`, rollResponse.rolls);
//   return rollResponse;
// };
