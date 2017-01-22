import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import 'antd/dist/antd.css'
import './index.css';
import './flux/Store';
import './flux/Actions';
import './flux/event-const';

ReactDOM.render(<App />, document.getElementById('root'));
