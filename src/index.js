import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import React from 'react'
import { render } from 'react-dom'
import CanvasContainer from './containers';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
  <Provider store={store}>
    <CanvasContainer/>
  </Provider>
  , document.getElementById('root')
);

