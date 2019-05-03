import {ApiServer} from '../../backend/api.service.ts'
import {put, call, takeLatest} from 'redux-saga/effects';

const taskActionType = {
    FETCH: 'TASK_FETCH',
    LOADING: 'TASK_LOADING_STATUS_CHANGE',
    FILL: 'TASK_FILL',
    ADD: 'TASK_ADD',
    ASSIGN: 'ASSIGN',
    COMPLETE: 'TASK_COMPLETE'
};

export class Tasks {
    static reducer(state = {tasks: [], loading: false},
                   action) {

        switch (action.type) {
            case taskActionType.LOADING: {
                return {
                    ...state,
                    loading: action.payload.loading,
                }
            }
            case taskActionType.FILL: {
                return {
                    tasks: action.payload.tasks,
                    loading: false,
                }
            }

            default:
                break;
        }

        return state
    }

    static fetch() {
        return {
            type: taskActionType.FETCH,
        }
    }

    static loading(loading) {
        return {
            type: taskActionType.LOADING,
            payload: {loading: loading}
        }
    }

    static add(description) {
        if (typeof description === 'string') {
            return {
                type: taskActionType.ADD,
                payload: description
            }
        } else {
            console.log('Description must be string')
        }
    }

    static complete(id, completed) {
        if (typeof id === 'number') {
            return {
                type: taskActionType.COMPLETE,
                payload: {
                    id: id,
                    completed: completed
                }
            }
        } else {
            console.log('Task ID must be a number')
        }
    }

    static fill(tasks) {
        return {
            type: taskActionType.FILL,
            payload: {tasks: tasks}
        }

    }

    static assign(ticketId, assigneeId) {

            return {
                type: taskActionType.ASSIGN,
                payload: {
                    ticketId: ticketId,
                    assigneeId: assigneeId
                }
            }

    }

    static sagas = [
        takeLatest(taskActionType.FETCH, taskFetchGen),
        takeLatest(taskActionType.ADD, taskAddGen),
        takeLatest(taskActionType.ASSIGN, taskAssingGen),
        takeLatest(taskActionType.COMPLETE, taskCompleteGen),
    ];
}

function* taskFetchGen() {
    yield put(Tasks.loading(true));
    let tasks = yield call (ApiServer.tickets);
    yield  console.log(tasks);
    yield put (Tasks.fill(tasks));
}
function* taskAddGen(action) {
    yield put(Tasks.loading(true));
    yield call (ApiServer.newTicket, {description: action.payload});
    yield put (Tasks.fetch());
}

function* taskAssingGen(action) {
    yield put(Tasks.loading(true));
    try {
        yield call (ApiServer.assign, action.payload.ticketId, action.payload.assigneeId);
        yield put (Tasks.fetch());
    } catch (error) {
        yield put(console.log(error));
    }
}
function* taskCompleteGen(action) {
    yield put(Tasks.loading(true));

    try {
        yield call(ApiServer.complete, action.payload.id, action.payload.completed);
        yield put (Tasks.fetch());
    } catch (error) {
        yield put(console.log(error));
    }

}