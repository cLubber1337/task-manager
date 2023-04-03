import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useTodoListStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        },
        title: {
            fontFamily: "cursive",
            paddingLeft: "8px"
        },
        button: {
            marginLeft: "8px"
        },
        divider: {
            height: "4px",
            marginTop: "12px"
        }
    }),
);