import React, {useEffect} from 'react';
import {Grid, Paper} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "redux/store.hook";
import {fetchTodoLists} from "redux/slices/todolist.slice";
import {TodoList} from "components/TodoList/TodoList";
import {getTodoLists} from "redux/selectors/todolist.selector";
import {useTodoListContainerStyles} from "styles/todolistContainer.styles";
import {getTasks} from "redux/selectors/task.selector";


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
