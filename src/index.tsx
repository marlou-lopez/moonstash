/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Start the mocking conditionally.
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const { worker } = require('./mocks/browser');
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
