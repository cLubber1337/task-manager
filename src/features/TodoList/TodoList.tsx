import React, {FC, memo, useCallback, useEffect} from 'react';
import {Box, Divider} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useTodoListStyles} from "features/TodoList/todolist.styles";
import {Task} from "features/Task/Task";
import {useAppDispatch} from "utils/store.hook";
import {changeTitleTodoListThunk, deleteTodoListThunk} from "features/TodoList/todolist.slice";
import {createTasksThunk, fetchTasks} from "features/Task/task.slice";
import {TextInputForm} from "common/components/TextInputForm";
import {AddItemForm} from "common/components/AddItemForm";
import {useTaskStyles} from "features/Task/task.styles";
import {TaskType} from "api/todolists.api";

export type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]

}
export const TodoList: FC<TodoListPropsType> = memo(({title, id, tasks}) => {
    const classes = useTodoListStyles();
    const useTaskClasses = useTaskStyles()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasks(id))
    }, [dispatch,id])

    const deleteTodoList = useCallback(() => {
        dispatch(deleteTodoListThunk(id))
    }, [dispatch, id])

    const changeTitleTodoList = useCallback((title: string) => {
        dispatch(changeTitleTodoListThunk({id, title}))
    }, [dispatch, id])
    const addTask = useCallback((title: string) => {
        dispatch(createTasksThunk({todolistId: id, title}))
    }, [dispatch, id])




    return (
        <>
            <TextInputForm className={classes}
                           changeTitleCallBack={changeTitleTodoList}
                           deleteCallBack={deleteTodoList}
                           currentTitle={title}
                           toolTipTitle="Delete todoList"
            />
            <Divider className={classes.divider}/>

            <AddItemForm className={useTaskClasses} addItem={addTask} placeholder="Add a new task"/>

            {tasks.map(task => <Task key={task.id} task={task} todolistId={id}/>)}

            <Box mt={4} className={classes.buttons}>
                <Button variant="contained" color="primary">All</Button>
                <Button className={classes.button} variant="contained">Active</Button>
                <Button className={classes.button} variant="contained">Completed</Button>
            </Box>
        </>
    );
});

