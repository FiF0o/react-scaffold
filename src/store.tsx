import { applyMiddleware, compose, createStore } from 'redux';

import reducers from './reducers/index';


const w = (window as any);
const devTools = (w.devToolsExtension ? w.devToolsExtension() : (f:any) => f);


function configureStore(initialState?: object) {
  const middlewares:any = [];
  const enhancers = compose(
    applyMiddleware(...middlewares),
    devTools
  );
  return createStore(reducers, initialState!, enhancers)
}

const store = configureStore();


export default store;
