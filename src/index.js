import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import './stylesheets/style.scss'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './components/Reducers/Reducer.js'

const store = createStore(rootReducer);

const Application = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(
  <Application />, 
  document.getElementById('root'),
  function(){
    let loader = document.getElementById('app-loader');
    loader.parentNode.removeChild(loader);
  }
)
