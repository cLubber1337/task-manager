import React from 'react';
import {Header} from "features/Header/Header";
import {TodoListContainer} from "features/TodoListContainer/TodoListContainer";
import {Box, Container} from "@material-ui/core";
import {TodoListAdder} from "features/TodoListAdder/TodoListAdder";
import {useAppStyles} from "app/app.styles";


export const App = () => {
    const classes = useAppStyles();
    return (
        <Box className={classes.content}>
            <Header/>
            <TodoListAdder/>
            <Container fixed>
                <TodoListContainer/>
            </Container>
        </Box>
    );
}


