import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './data/reducer';

// Redux Dev Tools
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware( thunk)));

export default store;
// @ts-ignore
if (module.hot) {
  //@ts-ignore
  module.hot.accept('./data/reducer', () => {
    store.replaceReducer(reducer);
  });
}