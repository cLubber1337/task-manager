import {createStyles, makeStyles} from "@material-ui/core/styles";

export const useTodoListContainerStyles = makeStyles(() =>
    createStyles({
        content: {
            justifyContent: "center",
            marginTop: "160px"
        },
        grid: {
            margin: "4px",
        },
        paper: {
            padding: "12px",
            minWidth: "320px",
            maxWidth: "350px"
        },
    }),
);