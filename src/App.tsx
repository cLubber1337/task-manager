import React from 'react';
import {Header} from "components/Header/Header";
import {TodoListContainer} from "components/TodoListContainer/TodoListContainer";
import {Box, Container} from "@material-ui/core";
import {TodoListAdder} from "components/TodoListAdder/TodoListAdder";
import {useAppStyles} from "styles/app.styles";


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


