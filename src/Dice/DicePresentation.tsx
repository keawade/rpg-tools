import * as React from 'react';

import * as moment from 'moment';
import {
  Button,
  Grid,
  Input,
  Table,
} from 'semantic-ui-react';

interface IDicePresentationProps {
  faces: number;
  quantity: number;
  rollHistory: IRollResponse[];
  handleInput: (event: React.SyntheticEvent<HTMLInputElement>, key: string) => void;
  handleRoll: (faces: number, quantity: number) => void;
}

const DicePresentation: React.StatelessComponent<IDicePresentationProps> = (props: IDicePresentationProps) => {
  return (
      <div>
        <Grid columns='equal'>
          <Grid.Column>
            <Input
              label='Quantity'
              value={props.quantity}
              onChange={(event) => props.handleInput(event, 'quantity')}
              type='number'
              min={1}
              fluid
            />
          </Grid.Column>
          <Grid.Column>
            <Input
              label='Faces'
              value={props.faces}
              onChange={(event) => props.handleInput(event, 'faces')}
              type='number'
              min={2}
              fluid
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <Button
              fluid
              onClick={() => props.handleRoll(props.faces, props.quantity)}
            >
              Roll {props.quantity}d{props.faces}
            </Button>
          </Grid.Column>
        </Grid>
        <Button.Group fluid style={{ paddingTop: '1rem' }}>
          <Button onClick={() => props.handleRoll(4, 1)}>Roll 1d4</Button>
          <Button onClick={() => props.handleRoll(6, 1)}>Roll 1d6</Button>
          <Button onClick={() => props.handleRoll(8, 1)}>Roll 1d8</Button>
          <Button onClick={() => props.handleRoll(10, 1)}>Roll 1d10</Button>
          <Button onClick={() => props.handleRoll(12, 1)}>Roll 1d12</Button>
          <Button onClick={() => props.handleRoll(20, 1)}>Roll 1d20</Button>
          <Button onClick={() => props.handleRoll(100, 1)}>Roll 1d100</Button>
        </Button.Group>
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
                <Table.Cell>{(roll.date as moment.Moment).format('LTS')}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
  );
};

export default DicePresentation;
