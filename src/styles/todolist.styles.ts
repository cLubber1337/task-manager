import {createStyles, makeStyles} from "@material-ui/core/styles";

export const useTodoListStyles = makeStyles(() =>
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
            marginLeft: "16px"
        },
        divider: {
            height: "4px",
            marginTop: "12px"
        },
        textField: {
            width: "270px",
            height: "32px",
            bottom: "14px"
        }
    }),
);