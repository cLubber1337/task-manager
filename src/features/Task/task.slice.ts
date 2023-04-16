import {createSlice} from "@reduxjs/toolkit";
import {ResultCode, TaskPriorities, TaskStatuses} from 'common/enums';
import {createTodoListThunk, deleteTodoListThunk, fetchTodoLists} from "features/TodoList/todolist.slice";
import {
    AddTaskArgType,
    DeleteTaskArgType,
    TaskType,
    todoListsApi,
    UpdateTaskArgType,
    UpdateTaskModelType
} from "api/todolists.api";
import {clearTasksAndTodoLists} from "common/actions";
import {handleServerAppError, thunkTryCatch} from "utils";
import {AppRootStateType} from "app/store";
import {createAppAsyncThunk} from "utils/createAppAsyncThunk";
import {setAppStatus} from "app/app.slice";


export const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[], todolistId: string }, string>(
    'task/getTasks',
    async (todolistId, thunkAPI) => {
        const {dispatch} = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
                const {data} = await todoListsApi.getTasks(todolistId)
                const tasks = data.items
                dispatch(setAppStatus({status: 'succeeded'}))
                return {tasks, todolistId}
            }
        )
    })
export const createTasksThunk = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>(
    'task/createTask',
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
            const {data} = await todoListsApi.createTask(arg)
            if (data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: 'succeeded'}))
                const task = data.data.item
                return {task}
            } else {
                handleServerAppError(data, dispatch);
                return rejectWithValue(null)
            }
        })
    })
export const deleteTasksThunk = createAppAsyncThunk<DeleteTaskArgType, DeleteTaskArgType>(
    'tasks/removeTask', async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        return thunkTryCatch(thunkAPI, async () => {
            const {data} = await todoListsApi.deleteTask(arg)
            if (data.resultCode === ResultCode.Success) {
                dispatch(setAppStatus({status: 'succeeded'}))
                return arg
            } else {
                handleServerAppError(data, dispatch);
                return rejectWithValue(null)
            }
        })
    })


export const updateTasksThunk = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
    'task/updateTask', async (arg, thunkAPI) => {
        const {rejectWithValue, getState} = thunkAPI
        try {
            // dispatch(appActions.setAppStatus({status: 'loading'}))
            const state = getState() as AppRootStateType
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
                return rejectWithValue(null)
            }
        } catch (e) {
            // handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })

const initialState: TasksStateType = {} //  [key: string]: TaskType[]

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
                state[action.payload.todolist.id] = []
            })
            .addCase(deleteTodoListThunk.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(createTasksThunk.fulfilled, (state, action) => {
                const tasks = state[(action.payload.task.todoListId)]
                tasks.unshift(action.payload.task)
            })
            .addCase(deleteTasksThunk.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) tasks.splice(index, 1)
            })
            .addCase(updateTasksThunk.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel}
                }
            })
            .addCase(clearTasksAndTodoLists, () => {
                return {}
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