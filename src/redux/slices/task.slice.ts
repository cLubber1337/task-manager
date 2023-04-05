import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api, TaskType} from "api/api";
import {createTodoListThunk, fetchTodoLists, deleteTodoListThunk} from "redux/slices/todolist.slice";

const initialState: TasksStateType = {} //  [key: string]: TaskType[]


export const fetchTasks = createAsyncThunk(
    'task/getTasks',
    async (todolistId: string) => {
        const {data} = await api.getTasks(todolistId)
        return data
    }
)

const taskSlice = createSlice({
        name: "task",
        initialState,
        reducers: {},
        extraReducers: builder => builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.meta.arg] = action.payload.items
            })
            .addCase(fetchTodoLists.fulfilled, (state, action) => {
                action.payload.forEach((tl) => {
                    state[tl.id] = []
                })
            })
            .addCase(createTodoListThunk.fulfilled, (state, action) => {
                state[action.payload.item.id] = []
            })
            .addCase(deleteTodoListThunk.fulfilled, (state, action) => {
                delete state[action.meta.arg]
            })
    },
)

export const {} = taskSlice.actions
export default taskSlice.reducer



export type TasksStateType = {
    [key: string]: TaskType[]
}