import {allReducers} from './allReducers';
import logger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';

const allMiddleware = applyMiddleware(logger);

export const store = createStore(allReducers, {}, allMiddleware);
