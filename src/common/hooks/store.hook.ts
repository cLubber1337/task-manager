import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"
import { AppDispatch, AppRootStateType } from "app/store"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
