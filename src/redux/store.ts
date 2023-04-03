import {configureStore} from "@reduxjs/toolkit";
import todoLists from "redux/slices/todolist.slice";


const store = configureStore({
    reducer: {
        todoLists
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch




export default store