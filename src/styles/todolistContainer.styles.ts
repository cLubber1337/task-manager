import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useTodoListContainerStyles = makeStyles((theme: Theme) =>
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
            minWidth: "350px"
        },
    }),
);