import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {todoListsApi, TodolistType} from "api/todolists.api";


export type TodoStateType = {
    todoLists: TodolistType[]
}

export const fetchTodoLists = createAsyncThunk(
    'todoLists/getTodoLists',
    async () => {
        const {data} = await todoListsApi.getTodoLists()
        return data
    }
)
export const deleteTodoListThunk = createAsyncThunk(
    'todoLists/removeTodoLists',
    async (id: string) => {
        const {data} = await todoListsApi.deleteTodolist(id)
        return data
    }
)
export const createTodoListThunk = createAsyncThunk(
    'todoLists/createTodoList',
    async (title: string) => {
        const {data} = await todoListsApi.createTodolist(title)
        return data.data
    }
)
export const changeTitleTodoListThunk = createAsyncThunk(
    'todoLists/changeTitleTodoList',
    async ({id, title}: {id: string, title: string} ) => {
        const {data} = await todoListsApi.updateTodolist(id, title)
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

export type FilterValuesType = 'all' | 'active' | 'completed';
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}



