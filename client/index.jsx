import React                from 'react';
import { render }           from 'react-dom';
import { Router }           from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Provider }         from 'react-redux';
import reducer              from 'reducers';
import routes               from 'routes';
import thunk                from "redux-thunk"
import promise              from "redux-promise-middleware"
import { createStore,
         combineReducers,
         applyMiddleware }  from 'redux';

const initialState = window.__INITIAL_STATE__;

const history = createBrowserHistory();

const store = applyMiddleware(promise(), thunk)(createStore)(reducer, initialState);

render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
);
