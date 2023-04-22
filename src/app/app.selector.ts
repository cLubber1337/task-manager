import { AppRootStateType } from "app/store"

export const getAppStatus = (state: AppRootStateType) => state.app.status
export const getAppError = (state: AppRootStateType) => state.app.error
export const getIsInitialized = (state: AppRootStateType) => state.app.isInitialized
