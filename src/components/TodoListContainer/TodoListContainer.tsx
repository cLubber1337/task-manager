import React, {useEffect} from 'react';
import {Grid, Paper} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "redux/store.hook";
import {fetchTodoLists} from "redux/slices/todolist.slice";
import {TodoList} from "components/TodoList/TodoList";
import {getTodoLists} from "redux/selectors/todolist.selector";


export const TodoListContainer = () => {
    const dispatch = useAppDispatch()
    const todoList = useAppSelector(getTodoLists)
    useEffect(()=> {
        dispatch(fetchTodoLists())
    },[])


    return (
        <>
            <Grid container spacing={3} style={{justifyContent: "center", marginTop: "160px"}}>
                {todoList.map(tl => {
                    return <Grid item style={{margin: "4px"}} key={tl.id}>
                        <Paper style={{padding: "10px"}}>
                            <TodoList {...tl}  />
                        </Paper>
                    </Grid>
                })
                }
            </Grid>
        </>
    );
}
