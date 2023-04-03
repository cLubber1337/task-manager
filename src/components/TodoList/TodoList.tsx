import React, {FC} from 'react';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import {Box, Divider, IconButton} from "@material-ui/core";
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {useTodoListStyles} from "styles/todolist.styles";
import {Task} from "components/Task/Task";

type TodoListType = {
    title: string
}

export const TodoList: FC<TodoListType> = ({title}) => {
    const classes = useTodoListStyles();

    return (
        <Box>
            <Box mt={1} className={classes.content}>
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
                <Box>
                    <IconButton size="small">
                        <EditSharpIcon color={"secondary"}/>
                    </IconButton>
                    <IconButton size="small">
                        <DeleteForeverSharpIcon color={"primary"}/>
                    </IconButton>
                </Box>
            </Box>
            <Divider className={classes.divider} />
            <Task/>
            <Box mt={4}>
                <Button variant="contained">All</Button>
                <Button className={classes.button} color="secondary" variant="contained">Active</Button>
                <Button className={classes.button} color="primary" variant="contained">Completed</Button>
            </Box>
        </Box>
    );
};

