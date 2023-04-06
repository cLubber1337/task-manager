import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api, TodolistType} from "api/api";


export type TodoStateType = {
    todoLists: TodolistType[]
}

export const fetchTodoLists = createAsyncThunk(
    'todoLists/getTodoLists',
    async () => {
        const {data} = await api.getToDo()
        return data
    }
)
export const deleteTodoListThunk = createAsyncThunk(
    'todoLists/removeTodoLists',
    async (id: string) => {
        const {data} = await api.deleteToDo(id)
        return data
    }
)
export const createTodoListThunk = createAsyncThunk(
    'todoLists/createTodoList',
    async (title: string) => {
        const {data} = await api.createToDo(title)
        return data.data
    }
)
export const changeTitleTodoListThunk = createAsyncThunk(
    'todoLists/changeTitleTodoList',
    async ({id, title}: {id: string, title: string} ) => {
        const {data} = await api.updateToDo(id, title)
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
        extraReducers: (builder) => builder
            .addCase(fetchTodoLists.fulfilled, (state, action) => {
                state.todoLists = action.payload
            })
            .addCase(deleteTodoListThunk.fulfilled, (state, action) => {
                state.todoLists = state.todoLists.filter(tl => tl.id !== action.meta.arg)
            })
            .addCase(createTodoListThunk.fulfilled, (state, action) => {
                state.todoLists.unshift(action.payload.item)
            })
            .addCase(changeTitleTodoListThunk.fulfilled, (state, action) => {
                const todoList = state.todoLists.find(tl => tl.id === action.meta.arg.id)
                if (todoList) {
                    todoList.title = action.meta.arg.title
                }
            })
    },
)

export const {} = todolistSlice.actions
export default todolistSlice.reducer




