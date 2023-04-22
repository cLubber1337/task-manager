import { authAPI, LoginParamsType } from "api/auth.api"
import { createAppAsyncThunk } from "utils"
import { clearTasksAndTodoLists } from "common/actions"
import { createSlice } from "@reduxjs/toolkit"
import { ResultCode } from "common/enums"
import { appActions } from "app/app.slice"

const loginThunk = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  "auth/login",
  async (arg, { rejectWithValue }) => {
    const { data } = await authAPI.login(arg)
    if (data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true }
    } else {
      const isShowAppError = !data.fieldsErrors.length
      return rejectWithValue({ data, showGlobalError: isShowAppError })
    }
  }
)

const logoutThunk = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    const { data } = await authAPI.logout()
    if (data.resultCode === ResultCode.Success) {
      dispatch(clearTasksAndTodoLists())
      return { isLoggedIn: false }
    } else {
      return rejectWithValue(null)
    }
  }
)

const initializeAppThunk = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  "app/initializeAppThunk",
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      const { data } = await authAPI.me()
      if (data.resultCode === ResultCode.Success) {
        return { isLoggedIn: true }
      } else {
        return rejectWithValue({ data, showGlobalError: false })
      }
    } finally {
      dispatch(appActions.setAppInitialized({ isInitialized: true }))
    }
  }
)

export type AuthStateType = {
  isLoggedIn: boolean
}
const initialState: AuthStateType = {
  isLoggedIn: false,
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(initializeAppThunk.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
})

export default authSlice.reducer
export const authThunks = { loginThunk, logoutThunk, initializeAppThunk }
