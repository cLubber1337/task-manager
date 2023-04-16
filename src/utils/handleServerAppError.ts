import {Dispatch} from 'redux';
import {ResponseType} from 'common/types/common.types';
import {setAppError} from "app/app.slice";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch, showError: boolean = true
) => {
	if (showError) {
		dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
	}
}
