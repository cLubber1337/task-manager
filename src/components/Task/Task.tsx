import React, {FC, useCallback} from 'react';
import Typography from "@material-ui/core/Typography";
import {Box, Checkbox, FormControlLabel, IconButton, List, ListItem} from "@material-ui/core";
import {useTaskStyles} from "styles/task.styles";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import DeleteForeverSharpIcon from "@material-ui/icons/DeleteForeverSharp";
import {TaskType} from "api/api";
import {AddItemForm} from "components/common/AddItemForm";
import {useAppDispatch} from "redux/store.hook";
import {createTasksThunk, deleteTasksThunk} from "redux/slices/task.slice";

type TaskPropsType = {
    tasks: TaskType[]
    todolistId: string
}

export const Task: FC<TaskPropsType> = ({tasks, todolistId}) => {
    const classes = useTaskStyles()
    const dispatch = useAppDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(createTasksThunk({todolistId, title}))
    }, [dispatch, todolistId])

    const deleteTask = useCallback((taskId: string) => {
        dispatch(deleteTasksThunk({todolistId, taskId}))
    }, [dispatch, todolistId])

    return (
        <Box className={classes.wrapper}>

            <AddItemForm className={classes} addItem={addTask} placeholder="Add a new task"/>

            <List>
                {tasks.map((task) => {
                    return (
                        <ListItem key={task.id} className={classes.listItem}>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label={<Typography className={classes.title}>{task.title}</Typography>}
                            />
                            <Box component={"span"}>
                                <IconButton size="small">
                                    <EditSharpIcon color={"secondary"}/>
                                </IconButton>
                                <IconButton size="small" onClick={() => deleteTask(task.id)}>
                                    <DeleteForeverSharpIcon color={"primary"}/>
                                </IconButton>
                            </Box>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    );
};

