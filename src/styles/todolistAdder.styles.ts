import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useTodoListAdderStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            position: "relative",
            margin: "0 auto",
            width: "400px",
            marginTop: "48px"
        },
        textField: {
            width: "100%",
            position: "absolute",
            right: 0,
            backgroundColor: "whitesmoke",
            borderRadius: "5px",
            textAlign: "center",
        },
        button: {
            width: "58px",
            height: "58px",
            cursor: "pointer",
            position: "absolute",
            top: 0,
            right: 0,
        },
        icon: {
            width: "56px",
            height: "56px",
            cursor: "pointer",
            position: "absolute",
            top: 0,
            right: 0,
        }
    }),
);