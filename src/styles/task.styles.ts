import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useTaskStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            marginTop: "16px",
        },
        title: {
            fontFamily: "cursive",
            paddingLeft: 0
        },
        listItem: {
            display: "flex",
            justifyContent: "space-between",
            padding: "0",
            marginLeft: "4px",
            marginTop: "4px"
        },
        textField: {
            display: "flex",
            textAlign: "center",
            alignContent: "center",
            '& .MuiOutlinedInput-root': {
                height: '40px',
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
            margin: "0 auto",
            position: "relative",
            maxWidth: "346px",
        },
    }),
);