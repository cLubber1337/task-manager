import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "api/api";
import {createTodoListThunk, fetchTodoLists, deleteTodoListThunk} from "redux/slices/todolist.slice";
import {RootState} from "redux/store";

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
export const updateTasksThunk = createAsyncThunk(
    'task/updateTask',
    async ([todolistId, taskId, domainModel]: [todolistId: string, taskId: string,
        domainModel: UpdateDomainTaskModelType], { getState }) => {
        const state = getState() as RootState
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        const {data} = await api.updateTask(todolistId, taskId, apiModel)
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
            .addCase(createTasksThunk.fulfilled, (state, action) => {
                const tasks = state[action.payload.data.item.todoListId]
                tasks.unshift(action.payload.data.item)
            })
            .addCase(deleteTasksThunk.fulfilled, (state, action) => {
                const tasks = state[action.meta.arg.todolistId]
                const index = tasks.findIndex(t => t.id === action.meta.arg.taskId)
                if (index !== -1) tasks.splice(index, 1)
            })
            .addCase(updateTasksThunk.fulfilled, (state, action) => {
                const tasks = state[action.meta.arg[0]]
                const index = tasks.findIndex(t => t.id === action.meta.arg[1])
                if (index !== -1) {
                    tasks[index] = {...tasks[index], ...action.meta.arg[2]}
                }
            } )

    }
)

export const {} = taskSlice.actions
export default taskSlice.reducer


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string

}

export type TasksStateType = {
    [key: string]: TaskType[]
}