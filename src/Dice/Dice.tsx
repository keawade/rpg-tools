import * as React from 'react';

import {
  Button,
  Input,
  Table,
} from 'semantic-ui-react';

import {
  roll,
} from '../utils';

interface IDiceState {
  faces: number;
  quantity: number;
  rollHistory: IRollResponse[];
}

class Dice extends React.Component<any, IDiceState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      faces: 6,
      quantity: 1,
      rollHistory: [roll(6)],
    };
  }

  handleRoll = () => {
    const { faces, quantity, rollHistory } = this.state;
    try {
      this.setState({
        rollHistory: [roll(faces, quantity), ...rollHistory]
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
    const { faces, quantity, rollHistory } = this.state;
    return (
      <div>
        <Input
          label='Quantity'
          value={quantity}
          onChange={(event) => this.handleInput(event, 'quantity')}
          type='number'
          min={1}
        />
        <Input
          label='Faces'
          value={faces}
          onChange={(event) => this.handleInput(event, 'faces')}
          type='number'
          min={2}
        />
        <Button onClick={this.handleRoll}>Roll {quantity}d{faces}</Button>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Result</Table.HeaderCell>
              <Table.HeaderCell>Dice</Table.HeaderCell>
              <Table.HeaderCell>Faces</Table.HeaderCell>
              <Table.HeaderCell>Time</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rollHistory.map((roll, index) => (
              <Table.Row key={index}>
                <Table.Cell>{roll.total}</Table.Cell>
                <Table.Cell>{roll.roll}</Table.Cell>
                <Table.Cell>{roll.values.toString()}</Table.Cell>
                <Table.Cell>{roll.date}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Dice;
