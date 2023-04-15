import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Box, LinearProgress} from "@material-ui/core";
import {useAppSelector} from "utils/store.hook";
import {getAppStatus} from "app/app.selector";


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

    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h2" className={classes.title}>
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color={"secondary"}/>}
            </AppBar>
        </Box>
    );
};

