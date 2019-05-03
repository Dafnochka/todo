import {combineReducers} from "redux"

import {Tasks} from "./tasks/Tasks"
import {Users} from "./users/Users"

export default combineReducers({
        tasksData: Tasks.reducer,
        usersData: Users.reducer,
    }
)