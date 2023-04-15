import React, {FC, memo, useCallback, useEffect} from 'react';
import {Box, Divider} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useTodoListStyles} from "features/TodoList/todolist.styles";
import {Task} from "features/Task/Task";
import {useAppDispatch} from "utils/store.hook";
import {
    changeTitleTodoListThunk,
    changeTodolistFilter,
    deleteTodoListThunk,
    TodolistDomainType
} from "features/TodoList/todolist.slice";
import {createTasksThunk, fetchTasks} from "features/Task/task.slice";
import {TextInputForm} from "common/components/TextInputForm";
import {AddItemForm} from "common/components/AddItemForm";
import {useTaskStyles} from "features/Task/task.styles";
import {TaskType} from "api/todolists.api";
import {TaskStatuses} from "common/enums";

export type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]
    todolist: TodolistDomainType
}
export const TodoList: FC<TodoListPropsType> = memo(({title, id, tasks, todolist}) => {
    const classes = useTodoListStyles();
    const useTaskClasses = useTaskStyles()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTasks(id))
    }, [dispatch, id])

    const deleteTodoList = useCallback(() => {
        dispatch(deleteTodoListThunk(id))
    }, [dispatch, id])

    const changeTitleTodoList = useCallback((title: string) => {
        dispatch(changeTitleTodoListThunk({id, title}))
    }, [dispatch, id])

    const addTask = useCallback((title: string) => {
        dispatch(createTasksThunk({todolistId: id, title}))
    }, [dispatch, id])


    const onAllClickHandler = useCallback(() => {
        dispatch(changeTodolistFilter({id: todolist.id, filter: "all"}))
    }, [todolist.id, changeTodolistFilter])

    const onActiveClickHandler = useCallback(() => {
        dispatch(changeTodolistFilter({id: todolist.id, filter: "active"}))
    }, [todolist.id, changeTodolistFilter])

    const onCompletedClickHandler = useCallback(() => {
        dispatch(changeTodolistFilter({id: todolist.id, filter: "completed"}))
    }, [todolist.id, changeTodolistFilter])

    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

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

            {tasksForTodolist.map(task => <Task key={task.id} task={task} todolistId={id}/>)}

            <Box mt={4} className={classes.buttons}>
                <Button onClick={onAllClickHandler}
                        variant={todolist.filter === 'all' ? 'contained' : 'text'}
                        color="primary">
                    All
                </Button>
                <Button onClick={onActiveClickHandler} className={classes.button}
                        variant={todolist.filter === 'active' ? 'contained' : 'text'}
                        color="primary">
                    Active
                </Button>
                <Button onClick={onCompletedClickHandler} className={classes.button}
                        variant={todolist.filter === 'completed' ? 'contained' : 'text'}
                        color="primary"
                >
                    Completed
                </Button>
            </Box>
        </>
    );
});

