import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import mock from '../mock/mock.js';
import antd from './style/antd.css'
import baseCss from './style/base.less';


/* const mockServer=new mock();
mockServer.mockStart() */

ReactDOM.render(routes,
  document.getElementById('app'));
