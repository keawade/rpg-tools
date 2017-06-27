import * as React from 'react';
import './DicePresentation.css';

import * as moment from 'moment';
import { Accordion, Button, Grid, Header, Icon, Input, Table } from 'semantic-ui-react';

interface IDicePresentationProps {
  faces: number;
  quantity: number;
  rollHistory: IRollResponse[];
  handleInput: (event: React.SyntheticEvent<HTMLInputElement>, key: string) => void;
  handleRoll: (faces: number, quantity: number) => void;
}

const renderRollSummary = (roll: IRollResponse): string => {
  let response = '';
  if (roll.values.length > 1) {
    roll.values.map((val, index) => {
      if (index < roll.values.length - 1) {
        response += `${val} + `;
      } else {
        response += `${val} = `;
      }
    });
  }
  response += roll.total.toString();
  return response;
};

const DicePresentation: React.StatelessComponent<IDicePresentationProps> = (props: IDicePresentationProps) => {
  return (
      <div>
        <Header size='huge' textAlign='center'>
          {renderRollSummary(props.rollHistory[0])}
        </Header>
        <Accordion defaultActiveIndex={0}>
          <Accordion.Title>
            <Icon name='dropdown' />
            Rolls
          </Accordion.Title>
          <Accordion.Content>
            <div className='dice-buttons'>
              <Button onClick={() => props.handleRoll(4, 1)}>1d4</Button>
              <Button onClick={() => props.handleRoll(6, 1)}>1d6</Button>
              <Button onClick={() => props.handleRoll(8, 1)}>1d8</Button>
              <Button onClick={() => props.handleRoll(10, 1)}>1d10</Button>
              <Button onClick={() => props.handleRoll(12, 1)}>1d12</Button>
              <Button onClick={() => props.handleRoll(20, 1)}>1d20</Button>
            </div>
          </Accordion.Content>
          <Accordion.Title>
            <Icon name='dropdown' />
            Custom Rolls
          </Accordion.Title>
          <Accordion.Content>
            <Grid columns='equal' stackable>
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
              <Grid.Column>
                <Button
                  fluid
                  onClick={() => props.handleRoll(props.faces, props.quantity)}
                >
                  Roll {props.quantity}d{props.faces}
                </Button>
              </Grid.Column>
            </Grid>
          </Accordion.Content>
        </Accordion>        <Table stackable={false}>
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
