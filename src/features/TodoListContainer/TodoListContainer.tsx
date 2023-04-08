import React, {useEffect} from 'react';
import {Grid, Paper} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "utils/store.hook";
import {fetchTodoLists} from "features/TodoList/todolist.slice";
import {TodoList} from "features/TodoList/TodoList";
import {getTodoLists} from "features/TodoList/todolist.selector";
import {useTodoListContainerStyles} from "features/TodoListContainer/todolistContainer.styles";
import {getTasks} from "features/Task/task.selector";


export const TodoListContainer = () => {
    const classes = useTodoListContainerStyles()
    const dispatch = useAppDispatch()
    const todoList = useAppSelector(getTodoLists)
    const tasks = useAppSelector(getTasks)
    useEffect(() => {
        dispatch(fetchTodoLists())
    }, [])


    return (
        <Grid container spacing={2} className={classes.content}>
            {todoList.map(tl => {
                let allTodolistTasks = tasks[tl.id]
                return <Grid item className={classes.grid} key={tl.id}>
                    <Paper className={classes.paper}>
                        <TodoList {...tl} tasks={allTodolistTasks}  />
                    </Paper>
                </Grid>
            })}
        </Grid>
    );
}
