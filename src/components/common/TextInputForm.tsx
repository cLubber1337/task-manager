import React, {ChangeEvent, FC, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import {Box, IconButton, TextField, Tooltip} from "@material-ui/core";
import DoneOutlineRoundedIcon from "@material-ui/icons/DoneOutlineRounded";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import DeleteForeverSharpIcon from "@material-ui/icons/DeleteForeverSharp";
import {ClassNameMap} from "@material-ui/styles";


type UniversalTextInputPropsType = {
    className: ClassNameMap
    deleteCallBack: () => void
    changeTitleCallBack: (title: string) => void
    currentTitle: string
}


export const TextInputForm: FC<UniversalTextInputPropsType> = ({
                                                                   className,
                                                                   deleteCallBack,
                                                                   changeTitleCallBack,
                                                                   currentTitle
                                                               }) => {
    const classes = className
    const [title, setTitle] = useState('')
    const [editTitle, setEditTitle] = useState(false)


    const onTextFieldChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTitle(event.target.value)
    }
    const onDeleteTodoListClick = () => {
        deleteCallBack()
    }
    const onDoneEditClick = () => {
        changeTitleCallBack(title)
        setEditTitle(false)
    }
    const onEnterKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            onDoneEditClick()
        }
    }
    return (
        <Box mt={1} className={classes.content}>


            {!editTitle && <Typography variant="h6" className={className.title}>
                {currentTitle}
            </Typography>}
            {editTitle && <TextField autoFocus className={className.textField} onChange={onTextFieldChange}
                                     defaultValue={currentTitle}
                                     onBlur={() => setEditTitle(false)}
                                     onKeyDown={onEnterKeyDown}
                                     label="Change the title"/>}


            <Box className={className.buttonGroup} >
                {editTitle && <Tooltip title="Accept">
                    <IconButton size="small" onMouseDown={onDoneEditClick}>
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
    );
};

