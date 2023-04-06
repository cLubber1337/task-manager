import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useTaskStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            display: "flex",
        },
        title: {
            fontFamily: "cursive",
        },
        buttonGroup: {

        },
        listItem: {
            display: "flex",
            padding: "0",
            alignItems: "center",
            marginLeft: "4px",
            marginTop: "4px"
        },
        textField: {
            display: "flex",
            textAlign: "center",
            alignContent: "center",
            '& .MuiOutlinedInput-root': {
                height: '40px',
                maxWidth: "346px",
            },
        },
        button:{
            width: "36px",
            height: "36px",
            cursor: "pointer",
            position: "absolute",
            top: "2px",
            right: "2px"
        },
        icon: {
            width: "36px",
            height: "36px",
            cursor: "pointer",
            position: "absolute",
            top: "0",
            right: "0"
        },
        form: {
            marginTop: "16px",
            margin: "0 auto",
            position: "relative",
            maxWidth: "346px",
        },
    }),
);