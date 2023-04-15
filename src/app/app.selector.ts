import {RootState} from 'app/store';

export const getAppStatus = (state: RootState) => state.app.status
export const getAppError = (state: RootState) => state.app.error
export const getIsInitialized = (state: RootState) => state.app.isInitialized
