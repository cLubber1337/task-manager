import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ResultCode, TaskPriorities, TaskStatuses} from 'common/enums';
import {createTodoListThunk, fetchTodoLists, deleteTodoListThunk} from "features/TodoList/todolist.slice";
import {
    AddTaskArgType,
    DeleteTaskArgType,
    TaskType,
    todoListsApi,
    UpdateTaskArgType,
    UpdateTaskModelType
} from "api/todolists.api";
import {RootState} from "app/store";



const initialState: TasksStateType = {} //  [key: string]: TaskType[]

export const fetchTasks = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, string>(
    'task/getTasks',
    async (todolistId, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
            const {data} = await todoListsApi.getTasks(todolistId)
            const tasks = data.items
            return {tasks, todolistId}
        } catch (e) {
            return rejectWithValue("Error")
        }
    }
)
export const createTasksThunk = createAsyncThunk<{ task: TaskType }, AddTaskArgType>(
    'task/createTask',
    async (arg, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
            const {data} = await todoListsApi.createTask(arg)
            if (data.resultCode === ResultCode.Success) {
                const task = data.data.item
                return {task}
            } else {
                return rejectWithValue("Error")
            }
        } catch (e) {
            return rejectWithValue("Error")
        }
    }
)
export const deleteTasksThunk = createAsyncThunk<{}, DeleteTaskArgType>(
    'task/deleteTask',
    async (arg, thunkAPI) => {
        const {rejectWithValue} = thunkAPI
        try {
            const {data} = await todoListsApi.deleteTask(arg)
            if (data.resultCode === ResultCode.Success) {
                return {data}
            } else {
                return rejectWithValue("Error")
            }
        } catch (e) {
            return rejectWithValue("Error")
        }
    }
)

export const updateTasksThunk = createAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
    'task/updateTask', async (arg, thunkAPI) => {
        const {rejectWithValue, getState} = thunkAPI
        try {
            // dispatch(appActions.setAppStatus({status: 'loading'}))
            const state = getState() as RootState
            const task = state.tasks[arg.todolistId].find(t => t.id === arg.taskId)
            if (!task) {
                // dispatch(appActions.setAppError({error: 'Task not found in the state'}))
                return rejectWithValue(null)
            }
            const apiModel: UpdateTaskModelType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status: task.status,
                ...arg.domainModel
            }
            const res = await todoListsApi.updateTask(arg.todolistId, arg.taskId, apiModel)
            if (res.data.resultCode === ResultCode.Success) {
                // dispatch(appActions.setAppStatus({status: 'succeeded'}))
                return arg
            } else {
                // handleServerAppError(res.data, dispatch);
                return rejectWithValue("Error")
            }
        } catch (e) {
            // handleServerNetworkError(e, dispatch)
            return rejectWithValue("Error")
        }
    })

const taskSlice = createSlice({
        name: "task",
        initialState,
        reducers: {},
        extraReducers: builder => builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(fetchTodoLists.fulfilled, (state, action) => {
                action.payload.todoLists.forEach((tl) => {
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
                const tasks = state[(action.payload.task.todoListId)]
                tasks.unshift(action.payload.task)
            })
            .addCase(deleteTasksThunk.fulfilled, (state, action) => {
                const tasks = state[action.meta.arg.todolistId]
                const index = tasks.findIndex(t => t.id === action.meta.arg.taskId)
                if (index !== -1) tasks.splice(index, 1)
            })
            .addCase(updateTasksThunk.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel}
                }
            })
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