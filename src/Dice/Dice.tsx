import * as React from 'react';

import DicePresentation from './DicePresentation';

import {
  roll,
} from '../utils';

interface IDiceState {
  faces: number;
  historyLength: number;
  quantity: number;
  rollHistory: IRollResponse[];
}

class Dice extends React.Component<any, IDiceState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      faces: 6,
      historyLength: 20,
      quantity: 1,
      rollHistory: [roll(6)],
    };
  }

  handleRoll = () => {
    const { faces, historyLength, quantity, rollHistory } = this.state;
    try {
      this.setState({
        rollHistory: [roll(faces, quantity), ...rollHistory.filter((h, i) => (i < historyLength - 1))]
      });
    } catch (err) {
      console.error(`[Dice] failed to roll ${quantity}d${faces}`, err);
    }
  }

  handleInput = (event: React.SyntheticEvent<HTMLInputElement>, key: string) => {
    try {
      this.setState({
        ...this.state,
        [key]: Number(event.currentTarget.value),
      });
    } catch (err) {
      console.error('[Dice] handleInput failed', err);
    }
  }

  render() {
    return (
      <DicePresentation
        {...this.state}
        handleInput={this.handleInput}
        handleRoll={this.handleRoll}
      />
    );
  }
}

export default Dice;
