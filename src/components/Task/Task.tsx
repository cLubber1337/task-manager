import React, {FC} from 'react';
import Typography from "@material-ui/core/Typography";
import {Box, Checkbox, FormControlLabel, IconButton, List, ListItem, TextField, Tooltip} from "@material-ui/core";
import {useTaskStyles} from "styles/task.styles";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import DeleteForeverSharpIcon from "@material-ui/icons/DeleteForeverSharp";
import {TaskType} from "api/api";
import AddBoxIcon from "@material-ui/icons/AddBox";

type TaskPropsType = {
    tasks: TaskType[]
}


export const Task: FC<TaskPropsType> = ({tasks}) => {
    const classes = useTaskStyles()
    const onAddTodoListClick = () => {
        console.log(123)
    }
    const onEnterKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            console.log(123)
        }
    }
    return (
        <Box className={classes.content}>

            <Box className={classes.adderTask}>
                <TextField className={classes.textField} onKeyDown={onEnterKeyDown} placeholder="Add a new task"
                           variant="outlined"/>
                <Tooltip title="Add">
                    <IconButton className={classes.button} onClick={onAddTodoListClick}>
                        <AddBoxIcon color={"secondary"} className={classes.iconButton}/>
                    </IconButton>
                </Tooltip>
            </Box>
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
                                <IconButton size="small">
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

