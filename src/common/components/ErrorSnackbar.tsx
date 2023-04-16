import React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'common/hooks';
import {setAppError} from "app/app.slice";
import {getAppError} from "app/app.selector";
import {Snackbar} from "@material-ui/core/";
import {AlertProps} from "@mui/material";



function MuiAlert(props: { elevation: number, ref: React.ForwardedRef<HTMLDivElement>, variant: string }) {
	return null;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref,
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {

	const error = useSelector(getAppError)
	const dispatch = useAppDispatch()

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		dispatch(setAppError({error: null}))
	}


	const isOpen = error !== null;

	return (
		<Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="error">
				{error}
			</Alert>
		</Snackbar>
	)
}
