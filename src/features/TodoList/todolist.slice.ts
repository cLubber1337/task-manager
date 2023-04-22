import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { todoListsApi, TodolistType, UpdateTodolistTitleArgType } from "api/todolists.api"
import { ResultCode } from "common/enums"
import { clearTasksAndTodoLists } from "common/actions"
import { createAppAsyncThunk } from "utils"

const fetchTodoLists = createAppAsyncThunk<{ todoLists: TodolistType[] }, void>(
  "todo/fetchTodoLists",
  async () => {
    const { data } = await todoListsApi.getTodoLists()
    return { todoLists: data }
  }
)

const deleteTodoListThunk = createAppAsyncThunk<{ id: string }, string>(
  "todo/removeTodolist",
  async (id, { dispatch, rejectWithValue }) => {
    dispatch(
      todoListActions.changeTodolistEntityStatus({
        id,
        entityStatus: "loading",
      })
    )
    const { data } = await todoListsApi.deleteTodolist(id)
    if (data.resultCode === ResultCode.Success) {
      return { id }
    } else {
      return rejectWithValue({ data, showGlobalError: true })
    }
  }
)

const createTodoListThunk = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  "todo/addTodolist",
  async (title, { rejectWithValue }) => {
    const { data } = await todoListsApi.createTodolist(title)
    if (data.resultCode === ResultCode.Success) {
      return { todolist: data.data.item }
    } else {
      return rejectWithValue({ data, showGlobalError: false })
    }
  }
)
const changeTitleTodoListThunk = createAppAsyncThunk<
  UpdateTodolistTitleArgType,
  UpdateTodolistTitleArgType
>("todo/changeTodolistTitle", async (arg, { rejectWithValue }) => {
  const { data } = await todoListsApi.updateTodolist(arg)
  if (data.resultCode === ResultCode.Success) {
    return arg
  } else {
    return rejectWithValue({ data, showGlobalError: true })
  }
})

const initialState: TodolistDomainType[] = []

const todolistSlice = createSlice({
  name: "todoLists",
  initialState,
  reducers: {
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>
    ) => {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>
    ) => {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.entityStatus = action.payload.entityStatus
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchTodoLists.fulfilled, (state, action) => {
        return action.payload.todoLists.map((tl) => ({
          ...tl,
          filter: "all",
          entityStatus: "idle",
        }))
      })
      .addCase(deleteTodoListThunk.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(createTodoListThunk.fulfilled, (state, action) => {
        const newTodolist: TodolistDomainType = {
          ...action.payload.todolist,
          filter: "all",
          entityStatus: "idle",
        }
        state.unshift(newTodolist)
      })
      .addCase(changeTitleTodoListThunk.fulfilled, (state, action) => {
        const todoList = state.find((tl) => tl.id === action.payload.id)
        if (todoList) {
          todoList.title = action.payload.title
        }
      })
      .addCase(clearTasksAndTodoLists, () => {
        return []
      }),
})

export const todoListActions = todolistSlice.actions
export const todoListThunks = {
  fetchTodoLists,
  deleteTodoListThunk,
  createTodoListThunk,
  changeTitleTodoListThunk,
}
export default todolistSlice.reducer

export type FilterValuesType = "all" | "active" | "completed"
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
