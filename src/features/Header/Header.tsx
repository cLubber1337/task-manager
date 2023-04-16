import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Box, LinearProgress} from "@material-ui/core";
import {useAppSelector} from "common/hooks/store.hook";
import {getAppStatus} from "app/app.selector";
import {getIsLoggedIn} from "features/Login/auth.selector";
import {useActions} from "common/hooks";
import {authThunks} from "features/Login/auth.slice";


const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
            fontFamily: "cursive",
            textAlign: "center"
        },
    }),
);

export const Header = () => {
    const status = useAppSelector(getAppStatus)
    const isLoggedIn = useAppSelector(getIsLoggedIn)
    const {logoutThunk} = useActions(authThunks)
    const logoutHandler = () => logoutThunk()

    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h2" className={classes.title}>
                        TodoList
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color={"secondary"}/>}
            </AppBar>
        </Box>
    );
};

