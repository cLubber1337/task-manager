import React, {useEffect} from 'react';
import {Grid, Paper} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "common/hooks/store.hook";
import {fetchTodoLists} from "features/TodoList/todolist.slice";
import {TodoList} from "features/TodoList/TodoList";
import {getTodoLists} from "features/TodoList/todolist.selector";
import {useTodoListContainerStyles} from "features/TodoListContainer/todolistContainer.styles";
import {getTasks} from "features/Task/task.selector";
import {getIsLoggedIn} from "features/Login/auth.selector";
import {Navigate} from "react-router-dom";


export const TodoListContainer = () => {
    const classes = useTodoListContainerStyles()
    const dispatch = useAppDispatch()
    const todoList = useAppSelector(getTodoLists)
    const tasks = useAppSelector(getTasks)
    const isLoggedIn = useAppSelector(getIsLoggedIn)
    useEffect(() => {
        dispatch(fetchTodoLists())
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <Grid container spacing={2} className={classes.content}>
            {todoList.map(tl => {
                let allTodolistTasks = tasks[tl.id]
                return <Grid item className={classes.grid} key={tl.id}>
                    <Paper className={classes.paper}>
                        <TodoList {...tl} todolist={tl} tasks={allTodolistTasks}  />
                    </Paper>
                </Grid>
            })}
        </Grid>
    );
}
