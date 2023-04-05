import React, {ChangeEvent, FC, memo, useEffect, useState} from 'react';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import {Box, Divider, IconButton, TextField, Tooltip} from "@material-ui/core";
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import {useTodoListStyles} from "styles/todolist.styles";
import {Task} from "components/Task/Task";
import {useAppDispatch, useAppSelector} from "redux/store.hook";
import {changeTitleTodoListThunk, deleteTodoListThunk} from "redux/slices/todolist.slice";
import {fetchTasks} from "redux/slices/task.slice";
import {TaskType} from "api/api";

export type TodoListPropsType = {
    id: string
    title: string
    tasks: TaskType[]

}

export const TodoList: FC<TodoListPropsType> = memo(({title, id, tasks}) => {
    const classes = useTodoListStyles();
    const dispatch = useAppDispatch()
    const [newTitle, setNewTitle] = useState('')
    const [editTitle, setEditTitle] = useState(false)

    useEffect(() => {
        dispatch(fetchTasks(id))
    }, [])

    const onTextFieldChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setNewTitle(event.target.value)
    }
    const onDeleteTodoListClick = () => {
        dispatch(deleteTodoListThunk(id))
    }
    const onDoneEditClick = () => {
        dispatch(changeTitleTodoListThunk({id, title: newTitle}))
        setEditTitle(false)
    }
    const onEnterKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            dispatch(changeTitleTodoListThunk({id, title: newTitle}))
            setEditTitle(false)
        }
    }
    return (
        <>
            <Box mt={1} className={classes.content}>

                {!editTitle && <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>}
                {editTitle && <TextField autoFocus className={classes.textField} onChange={onTextFieldChange}
                                         defaultValue={title}
                                         onBlur={()=>setEditTitle(false)}
                                         onKeyDown={onEnterKeyDown}
                                         label="Change the title"/>}
                <Box>
                    {editTitle && <Tooltip title="Accept"><IconButton size="small" onClick={onDoneEditClick}>
                        <DoneOutlineRoundedIcon color={"secondary"}/>
                    </IconButton></Tooltip>}

                    {!editTitle && <Tooltip title="Edit title">
                        <IconButton size="small" onClick={() => setEditTitle(true)}>
                            <EditSharpIcon color={"secondary"}/>
                        </IconButton>
                    </Tooltip>}
                    <Tooltip title="Delete TodoList">
                        <IconButton onClick={onDeleteTodoListClick} size="small">
                            <DeleteForeverSharpIcon color={"primary"}/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Divider className={classes.divider}/>

            <Task tasks={tasks}/>

            <Box mt={4}>
                <Button variant="contained" color="primary">All</Button>
                <Button className={classes.button} variant="contained">Active</Button>
                <Button className={classes.button} variant="contained">Completed</Button>
            </Box>
        </>
    );
});

