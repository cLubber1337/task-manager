import React from 'react';
import {Header} from "features/Header/Header";
import {TodoListContainer} from "features/TodoListContainer/TodoListContainer";
import {Box, Container} from "@material-ui/core";
import {TodoListAdder} from "features/TodoListAdder/TodoListAdder";
import {useAppStyles} from "app/app.styles";
import {BrowserRouter, Route, Routes} from "react-router-dom";


export const App = () => {
    const classes = useAppStyles();
    return (

            <Box className={classes.content}>

                <Header/>

                <TodoListAdder/>


                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodoListContainer/>}/>
                    </Routes>
                </Container>
            </Box>

    );
}


