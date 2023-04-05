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
export const createTasksThunk = createAsyncThunk(
    'task/createTask',
    async ({todolistId, title}: { todolistId: string, title: string }) => {
        const {data} = await api.createTask(todolistId, title)
        return data

    }
)
export const deleteTasksThunk = createAsyncThunk(
    'task/deleteTask',
    async ({todolistId, taskId}: { todolistId: string, taskId: string }) => {
        const {data} = await api.deleteTask(todolistId, taskId)
        return data.data
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
            .addCase(createTasksThunk.fulfilled, (state, action) => {
                const tasks = state[action.payload.data.item.todoListId]
                tasks.unshift(action.payload.data.item)
            })
            .addCase(deleteTasksThunk.fulfilled,(state, action)=>{
                const tasks = state[action.meta.arg.todolistId]
                const index = tasks.findIndex(t => t.id === action.meta.arg.taskId)
                if (index !== -1) tasks.splice(index, 1)
            })
    }
)

export const {} = taskSlice.actions
export default taskSlice.reducer


export type TasksStateType = {
    [key: string]: TaskType[]
}