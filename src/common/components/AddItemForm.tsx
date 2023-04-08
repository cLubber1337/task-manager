import React, {ChangeEvent, FC, useState} from 'react';
import {Box, IconButton, TextField, Tooltip} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import {ClassNameMap} from "@material-ui/styles";

type AddItemFormType = {
    className: ClassNameMap
    addItem: (title: string) => void
    placeholder: string
}

export const AddItemForm: FC<AddItemFormType> = ({className, addItem, placeholder}) => {
    const classes = className
    const [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onTextFieldChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTitle(event.target.value)
        setError(null)
    }

    const onAddItemClick = () => {
        if (title.trim() !== '') {
            addItem(title)
            setTitle("")
        } else {
            setError('Title is required');
        }
    }
    const onEnterKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            onAddItemClick()
        }
    }
    return (
        <Box className={classes.form}>
            <TextField className={classes.textField}
                       variant="outlined"
                       error={!!error}
                       placeholder={placeholder}
                       value={title}
                       onKeyDown={onEnterKeyDown}
                       onChange={onTextFieldChange}
                       helperText={error}
            />
            <Tooltip title="Add">
                <IconButton className={classes.button} onClick={onAddItemClick}>
                    <AddBoxIcon color={"secondary"} className={classes.icon}/>
                </IconButton>
            </Tooltip>
        </Box>
    );
};

