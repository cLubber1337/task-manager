import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Box, Checkbox, FormControlLabel, IconButton, List, ListItem} from "@material-ui/core";
import {useTaskStyles} from "styles/task.styles";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import DeleteForeverSharpIcon from "@material-ui/icons/DeleteForeverSharp";

export const Task = () => {
    const classes = useTaskStyles()

    return (
        <Box className={classes.content}>
            <List>
                {["Eat dish, drink vodka, sleep", "Play Football", 1123123123, 112312311].map((task, id) => {
                    return (
                        <ListItem key={id} className={classes.listItem}>
                            <FormControlLabel
                                control={<Checkbox/>}
                                label={<Typography className={classes.title}>{task}</Typography>}
                            />
                            <Box component={"span"} className={classes.iconBlock}>
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

