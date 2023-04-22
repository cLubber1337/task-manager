import { AnyAction, configureStore, Store, ThunkDispatch } from "@reduxjs/toolkit"
import tasks, { TasksStateType } from "features/Task/task.slice"
import todoLists, { TodolistDomainType } from "features/TodoList/todolist.slice"
import app, { AppInitialStateType } from "app/app.slice"
import auth, { AuthStateType } from "features/Login/auth.slice"

const store: Store<RootState> = configureStore({
    reducer: {
        tasks,
        todoLists,
        app,
        auth,
    },
})

type RootState = {
    tasks: TasksStateType
    todoLists: TodolistDomainType[]
    app: AppInitialStateType
    auth: AuthStateType
}
export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export default store
