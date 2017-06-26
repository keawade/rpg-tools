export const rollOne = (faces: number = 6) => {
  return Math.ceil(Math.random() * faces);
};

export const roll = (faces: number, quantity: number = 1): IRollResponse => {
  const rolls = new Array(quantity).fill(0).map(() => (rollOne(faces)));
  const rollResponse = {
    date: Date.now(),
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
