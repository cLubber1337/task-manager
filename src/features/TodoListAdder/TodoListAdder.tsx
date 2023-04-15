import React, {useCallback} from 'react';
import {useTodoListAdderStyles} from "features/TodoListAdder/todolistAdder.styles";
import {useAppDispatch} from "utils/store.hook";
import {createTodoListThunk} from "features/TodoList/todolist.slice";
import {AddItemForm} from "common/components/AddItemForm";

export const TodoListAdder = () => {
    const classes = useTodoListAdderStyles();
    const dispatch = useAppDispatch()

    const addTodoList = useCallback((title: string) => {
        console.log(title)
        dispatch(createTodoListThunk(title))
    },[dispatch])


    return (
           <AddItemForm className={classes} addItem={addTodoList} placeholder="Write the name of your Todolist" />
    );
};