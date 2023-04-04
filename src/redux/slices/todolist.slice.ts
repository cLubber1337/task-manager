import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api, ItemType} from "api/api";
import {TodoListType} from "components/TodoList/TodoList";

export type TodoStateType = {
    todoLists: ItemType[]
}

export const fetchTodoLists = createAsyncThunk(
    'todoLists/getNewTodoLists',
    async () => {
        const {data} = await api.getToDo()
        return data
    }
)
export const removeTodoListThunk = createAsyncThunk(
    'todoLists/removeTodoLists',
    async (todolistId: string) => {
        const {data} = await api.removeToDo(todolistId)
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
    async ({id, title}: TodoListType) => {
        const {data} = await api.changeTitleToDo(id, title)
        return data.data
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
            .addCase(removeTodoListThunk.fulfilled, (state, action) => {
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




