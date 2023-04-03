import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api, TodolistType} from "api/api";

export type TodoStateType = {
    todoLists: TodolistType[]
}

export const fetchTodoLists = createAsyncThunk(
    'todoLists/getNewTodoLists',
    async () => {
        const {data} = await api.getToDo()
        return data
    }
)

const initialState: TodoStateType = {
    todoLists: [],
}

    const todolistSlice = createSlice({
    name: "todoLists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodoLists.fulfilled, (state, action) => {
            state.todoLists = action.payload
        })
    },
})

export const {} = todolistSlice.actions
export default todolistSlice.reducer