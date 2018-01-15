import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import mock from '../mock/mock.js';

const mockServer=new mock();
mockServer.mockStart()

ReactDOM.render(routes,
  document.getElementById('app'));
