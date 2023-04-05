import React, {ChangeEvent, useState} from 'react';
import {Box, IconButton, TextField} from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {useTodoListAdderStyles} from "styles/todolistAdder.styles";
import {useAppDispatch} from "redux/store.hook";
import {createTodoListThunk} from "redux/slices/todolist.slice";

export const TodoListAdder = () => {
    const classes = useTodoListAdderStyles();
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState('')

    const onTextFieldChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const onAddTodoListClick = () => {
        dispatch(createTodoListThunk(title))
        setTitle("")
    }
    const onEnterKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            dispatch(createTodoListThunk(title))
            setTitle("")
        }
    }

    return (
        <Box className={classes.content}>
            <TextField className={classes.textField}
                       variant="outlined"
                       placeholder="Write the name of your Todolist"
                       value={title}
                       onKeyDown={onEnterKeyDown}
                       onChange={onTextFieldChange}
            />
            <IconButton className={classes.button} onClick={onAddTodoListClick}>
                <AddBoxIcon color={"secondary"} className={classes.icon}/>
            </IconButton>
        </Box>
    );
};
