import {setAppStatus} from "app/app.slice";
import {BaseThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AppDispatch, AppRootStateType} from "app/store";
import {handleServerNetworkError} from "utils/handleServerNetworkError";
import {ResponseType} from "common/types";


export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<AppRootStateType, any, AppDispatch, null | ResponseType>, logic: Function) => {
	const {dispatch, rejectWithValue} = thunkAPI
	dispatch(setAppStatus({status: 'loading'}))
	try {
		return await logic()
	} catch (e) {
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	} finally {
		dispatch(setAppStatus({status: 'idle'}))
	}
}

