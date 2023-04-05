import React, {useCallback} from 'react';
import {useTodoListAdderStyles} from "styles/todolistAdder.styles";
import {useAppDispatch} from "redux/store.hook";
import {createTodoListThunk} from "redux/slices/todolist.slice";
import {AddItemForm} from "components/common/AddItemForm";

export const TodoListAdder = () => {
    const classes = useTodoListAdderStyles();
    const dispatch = useAppDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodoListThunk(title))
    },[dispatch])


    return (
           <AddItemForm className={classes} addItem={addTodoList} placeholder="Write the name of your Todolist" />
    );
};
