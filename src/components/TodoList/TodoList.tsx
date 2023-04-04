import React, {ChangeEvent, FC, useState} from 'react';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import {Box, Divider, IconButton, TextField, Tooltip} from "@material-ui/core";
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DoneOutlineRoundedIcon from '@material-ui/icons/DoneOutlineRounded';
import {useTodoListStyles} from "styles/todolist.styles";
import {Task} from "components/Task/Task";
import {useAppDispatch} from "redux/store.hook";
import {changeTitleTodoListThunk, removeTodoListThunk} from "redux/slices/todolist.slice";

export type TodoListType = {
    id: string
    title: string
}

export const TodoList: FC<TodoListType> = ({title, id}) => {
    const classes = useTodoListStyles();
    const dispatch = useAppDispatch()
    const [newTitle, setNewTitle] = useState('')
    const [editTitle, setEditTitle] = useState(false)

    const onTextFieldChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setNewTitle(event.target.value)
    }
    const onDeleteTodoList = () => {
        dispatch(removeTodoListThunk(id))
    }
    const onDoneEditClick = () => {
        dispatch(changeTitleTodoListThunk({id, title: newTitle}))
        setEditTitle(false)
    }
    return (
        <>
            <Box mt={1} className={classes.content}>

                {!editTitle && <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>}
                {editTitle && <TextField autoFocus className={classes.textField} onChange={onTextFieldChange}
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
                        <IconButton onClick={onDeleteTodoList} size="small">
                            <DeleteForeverSharpIcon color={"primary"}/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Divider className={classes.divider}/>

            <Task/>

            <Box mt={4}>
                <Button variant="contained">All</Button>
                <Button className={classes.button} color="secondary" variant="contained">Active</Button>
                <Button className={classes.button} color="primary" variant="contained">Completed</Button>
            </Box>
        </>
    );
};

