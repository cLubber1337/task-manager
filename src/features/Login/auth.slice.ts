import {authAPI, LoginParamsType} from "api/auth.api";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from "utils";
import {setAppInitialized, setAppStatus} from "app/app.slice";
import {clearTasksAndTodoLists} from "common/actions";
import {createSlice} from "@reduxjs/toolkit";


const loginThunk = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>
('auth/login', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setAppStatus({status: 'loading'}))
        const {data} = await authAPI.login(arg)
        if (data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            const isShowAppError = !data.fieldsErrors.length
            handleServerAppError(data, dispatch, isShowAppError)
            return rejectWithValue(data)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})


const logoutThunk = createAppAsyncThunk<{ isLoggedIn: boolean }, void>
('auth/logout', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(setAppStatus({status: 'loading'}))
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(clearTasksAndTodoLists())
            dispatch(setAppStatus({status: 'succeeded'}))
            return {isLoggedIn: false}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const initializeAppThunk = createAppAsyncThunk<{ isLoggedIn: boolean }, void>
('app/initializeAppThunk', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            return {isLoggedIn: true}
        } else {
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setAppInitialized({isInitialized: true}));
    }
})


export type AuthStateType = {
    isLoggedIn: boolean
}
const initialState: AuthStateType = {
    isLoggedIn: false
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
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
    }
})

export default authSlice.reducer
export const authThunks = {loginThunk, logoutThunk, initializeAppThunk}




