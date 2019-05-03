import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { all } from 'redux-saga/effects';

import reducer from './Reducer';
import {Tasks} from "./tasks/Tasks";
import {Users} from "./users/Users";
const logger=createLogger;
const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware, logger);

export default createStore(reducer, middleware);

function* watchSaga() {
    yield all([
        ...Tasks.sagas,
        ...Users.sagas
    ]);
}
sagaMiddleware.run(watchSaga);

