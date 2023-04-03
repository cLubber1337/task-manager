import React from 'react';
import {Box, IconButton, TextField} from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {useTodoListAdderStyles} from "styles/todolistAdder.styles";

export const TodoListAdder = () => {
    const classes = useTodoListAdderStyles();

    return (
        <Box className={classes.content}>
            <TextField className={classes.textField}
                       variant="outlined"
                       placeholder="Write the name of your Todolist"
            />
            <IconButton className={classes.button}>
                <AddBoxIcon color={"secondary"} className={classes.icon}/>
            </IconButton>
        </Box>
    );
};

// label="Write the name of your Todolist"