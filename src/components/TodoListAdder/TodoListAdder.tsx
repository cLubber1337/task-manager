import React from 'react';
import {Box, IconButton, TextField} from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';

export const TodoListAdder = () => {
const error = "50px"
    return (
        <>
            <Box style={{position: "relative", margin: "0 auto", width: "400px", marginTop: "48px"}}>
                <TextField
                    variant="outlined"
                    style={{
                        width: "100%",
                        position: "absolute",
                        right: 0,
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",
                    }}
                />
                <IconButton
                    style={{
                        width: "58px",
                        height: "58px",
                        cursor: "pointer",
                        position: "absolute",
                        top: 0,
                        right: 0,
                    }}>
                    <AddBoxIcon
                        style={{
                            width: "56px",
                            height: "56px",
                            cursor: "pointer",
                            position: "absolute",
                            top: 0,
                            right: 0,
                        }}
                        color={"secondary"}
                    />
                </IconButton>


            </Box>

        </>
    );
};

