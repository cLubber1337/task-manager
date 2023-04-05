import {configureStore} from "@reduxjs/toolkit";
import todoLists from "redux/slices/todolist.slice";
import tasks from "redux/slices/task.slice";


const store = configureStore({
    reducer: {
        todoLists, tasks
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store