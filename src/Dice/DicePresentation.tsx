import * as React from 'react';

import {
  Button,
  Input,
  Table,
} from 'semantic-ui-react';

interface IDicePresentationProps {
  faces: number;
  quantity: number;
  rollHistory: IRollResponse[];
  handleInput: (event: React.SyntheticEvent<HTMLInputElement>, key: string) => void;
  handleRoll: () => void;
}

const DicePresentation: React.StatelessComponent<IDicePresentationProps> = (props: IDicePresentationProps) => {
  return (
      <div>
        <Input
          label='Quantity'
          value={props.quantity}
          onChange={(event) => props.handleInput(event, 'quantity')}
          type='number'
          min={1}
        />
        <Input
          label='Faces'
          value={props.faces}
          onChange={(event) => props.handleInput(event, 'faces')}
          type='number'
          min={2}
        />
        <Button onClick={props.handleRoll}>Roll {props.quantity}d{props.faces}</Button>
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
            {props.rollHistory.map((roll, index) => (
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
};

export default DicePresentation;
