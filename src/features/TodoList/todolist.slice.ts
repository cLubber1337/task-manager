import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todoListsApi, TodolistType, UpdateTodolistTitleArgType} from "api/todolists.api";
import {ResultCode} from "common/enums";

export const fetchTodoLists = createAsyncThunk<{ todoLists: TodolistType[] }, void>
('todo/fetchTodoLists', async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI
    try {

        const {data} = await todoListsApi.getTodoLists()

        return {todoLists: data}

    } catch (e) {

        return rejectWithValue(null)
    }
})



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
export const changeTitleTodoListThunk = createAsyncThunk<UpdateTodolistTitleArgType, UpdateTodolistTitleArgType>(
    'todo/changeTodolistTitle', async (arg, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {

            const res = await todoListsApi.updateTodolist(arg)

            if (res.data.resultCode === ResultCode.Success) {

                return arg
            } else {

                return rejectWithValue(null)
            }
        } catch (e) {

            return rejectWithValue(null)
        }
    })

const initialState: TodolistDomainType[] = []

//action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
const todolistSlice = createSlice({
        name: "todoLists",
        initialState,
        reducers: {
            changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
                const todo = state.find(todo => todo.id === action.payload.id)
                if (todo) {
                    todo.filter = action.payload.filter
                }
            },
        },
        extraReducers: (builder) => builder
            .addCase(fetchTodoLists.fulfilled, (state, action) => {
                return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(deleteTodoListThunk.fulfilled, (state, action) => {
                state.filter(tl => tl.id !== action.meta.arg)
            })
            .addCase(createTodoListThunk.fulfilled, (state, action) => {
                const newTodolist: TodolistDomainType = {
                    ...action.payload.item,
                    filter: 'all',
                    entityStatus: 'idle'
                }
                state.unshift(newTodolist)
            })
            .addCase(changeTitleTodoListThunk.fulfilled, (state, action) => {
                const todoList = state.find(tl => tl.id === action.meta.arg.id)
                if (todoList) {
                    todoList.title = action.payload.title
                }
            })
    },
)

export const {changeTodolistFilter} = todolistSlice.actions
export default todolistSlice.reducer

export type FilterValuesType = 'all' | 'active' | 'completed';
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}



