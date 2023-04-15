import {configureStore} from "@reduxjs/toolkit";
import tasks from "features/Task/task.slice";
import todoLists from "features/TodoList/todolist.slice";
import app from "app/app.slice";




const store = configureStore({
    reducer: {
        tasks, todoLists, app
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store