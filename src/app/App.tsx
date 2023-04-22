import React, {useEffect} from 'react';
import {Header} from "features/Header/Header";
import {TodoListContainer} from "features/TodoListContainer/TodoListContainer";
import {Box, CircularProgress, Container} from "@material-ui/core";
import {TodoListAdder} from "features/TodoListAdder/TodoListAdder";
import {useAppStyles} from "app/app.styles";
import {Route, Routes} from "react-router-dom";
import {Login} from "features/Login/Login";
import {useAppSelector} from "common/hooks/store.hook";
import {getIsInitialized} from "app/app.selector";
import {authThunks} from "features/Login/auth.slice";
import {useActions} from "common/hooks";
import {getIsLoggedIn} from "features/Login/auth.selector";
import {ErrorSnackbar} from "common/components/ErrorSnackbar";


export const App = () => {
    const classes = useAppStyles();
    const isInitialized = useAppSelector(getIsInitialized)
    const IsLoggedIn = useAppSelector(getIsLoggedIn)
    const {initializeAppThunk} = useActions(authThunks)
    useEffect(() => {
        initializeAppThunk()
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <Box className={classes.content}>
            <ErrorSnackbar/>
            <Header/>
            {IsLoggedIn && <TodoListAdder/>}
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodoListContainer/>}/>
                    <Route path={'login'} element={<Login/>}/>
                </Routes>
            </Container>
        </Box>
    )
}


