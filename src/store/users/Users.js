import {ApiServer} from '../../backend/api.service.ts'
import {put, call, takeLatest} from 'redux-saga/effects';

const userActionType = {
    FETCH: 'USERS_FETCH',
    LOADING: 'USERS_LOADING_STATUS_CHANGE',
    FILL: 'USERS_FILL',
};

export class Users {
    static reducer(state = {users: {}, loading: false},
                   action) {

        switch (action.type) {
            case userActionType.LOADING: {
                return {
                    ...state,
                    loading: action.payload.loading,
                }
            }
            case userActionType.FILL: {
                const users = {};
                action.payload.users.map((user) => users[user.id] = user);
                return {
                    users: users,
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
            type: userActionType.FETCH,
        }
    }

    static loading(loading) {
        return {
            type: userActionType.LOADING,
            payload: {loading: loading}
        }
    }


    static fill(users) {
        return {
            type: userActionType.FILL,
            payload: {users: users}
        }

    }

    static sagas = [
        takeLatest(userActionType.FETCH, usersFetchGen),
    ];
}

function* usersFetchGen() {
    yield put(Users.loading(true));
    let users = yield call (ApiServer.users);
    yield put (Users.fill(users));
}
