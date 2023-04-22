import { createSlice } from "@reduxjs/toolkit"
import { ResultCode, TaskPriorities, TaskStatuses } from "common/enums"
import { todoListThunks } from "features/TodoList/todolist.slice"
import {
  AddTaskArgType,
  DeleteTaskArgType,
  TaskType,
  todoListsApi,
  UpdateTaskArgType,
  UpdateTaskModelType,
} from "api/todolists.api"
import { clearTasksAndTodoLists } from "common/actions"
import { createAppAsyncThunk } from "utils"
import { appActions } from "app/app.slice"

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  "task/getTasks",
  async (todolistId) => {
    const { data } = await todoListsApi.getTasks(todolistId)
    const tasks = data.items
    return { tasks, todolistId }
  }
)

const createTasksThunk = createAppAsyncThunk<{ task: TaskType }, AddTaskArgType>(
  "task/createTask",
  async (arg, { rejectWithValue }) => {
    const { data } = await todoListsApi.createTask(arg)
    if (data.resultCode === ResultCode.Success) {
      const task = data.data.item
      return { task }
    } else {
      return rejectWithValue({ data, showGlobalError: false })
    }
  }
)

const deleteTasksThunk = createAppAsyncThunk<DeleteTaskArgType, DeleteTaskArgType>(
  "tasks/removeTask",
  async (arg, { rejectWithValue }) => {
    const { data } = await todoListsApi.deleteTask(arg)
    if (data.resultCode === ResultCode.Success) {
      return arg
    } else {
      return rejectWithValue({ data, showGlobalError: true })
    }
  }
)

const updateTasksThunk = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
  "task/updateTask",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI

    const state = getState()
    const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId)
    if (!task) {
      dispatch(appActions.setAppError({ error: "Task not found in the state" }))
      return rejectWithValue(null)
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...arg.domainModel,
    }

    const { data } = await todoListsApi.updateTask(arg.todolistId, arg.taskId, apiModel)
    if (data.resultCode === ResultCode.Success) {
      return arg
    } else {
      return rejectWithValue({ data, showGlobalError: true })
    }
  }
)

const initialState: TasksStateType = {} //  [key: string]: TaskType[]

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(todoListThunks.fetchTodoLists.fulfilled, (state, action) => {
        action.payload.todoLists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(todoListThunks.createTodoListThunk.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todoListThunks.deleteTodoListThunk.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(createTasksThunk.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift(action.payload.task)
      })
      .addCase(deleteTasksThunk.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) tasks.splice(index, 1)
      })
      .addCase(updateTasksThunk.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      })
      .addCase(clearTasksAndTodoLists, () => {
        return {}
      }),
})

export const taskThunks = {
  fetchTasks,
  createTasksThunk,
  deleteTasksThunk,
  updateTasksThunk,
}

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
