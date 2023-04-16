import {AnyAction, configureStore, Store, ThunkDispatch} from "@reduxjs/toolkit";
import tasks, {TasksStateType} from "features/Task/task.slice";
import todoLists, {TodolistDomainType} from "features/TodoList/todolist.slice";
import app, {AppInitialStateType} from "app/app.slice";




const store: Store<RootState> = configureStore({
    reducer: {
        tasks, todoLists, app
    }
})

type RootState = {
    tasks: TasksStateType,
    todoLists: TodolistDomainType[],
    app: AppInitialStateType
}
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>


export default store