import * as React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import {
  Container,
  Menu,
  Segment,
} from 'semantic-ui-react';

import Home from '../Home';
import Dice from '../Dice';

const backgroundImage = require('./fantasy-landscape.png');

const App = (props: {}) => {
  return (
    <BrowserRouter>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPositionX: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <Container>
          <div className='App'>
            <Menu stackable>
              <Menu.Item header><Link to='/'>RPG Tools</Link></Menu.Item>
              <Menu.Item><Link to='/dice'>Dice</Link></Menu.Item>
            </Menu>
            <Segment>
              <Route exact path='/' component={Home} />
              <Route exact path='/dice' component={Dice as any} />
            </Segment>
          </div>
        </Container>
      </div>
    </BrowserRouter>
  );
};

export default App;
