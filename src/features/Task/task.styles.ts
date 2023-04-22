import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useTaskStyles = makeStyles(() =>
    createStyles({
        content: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "4px",
            alignItems: "center",
            width: "100%",
        },
        checked: {
            textDecoration: "line-through",
            opacity: 0.5,
        },
        title: {
            fontFamily: "cursive",
            width: "100%",
            wordWrap: "break-word",
            textAlign: "end",
        },
        textField: {
            display: "flex",
            textAlign: "center",
            width: "100%",
            "& .MuiOutlinedInput-root": {
                height: "40px",
                maxWidth: "346px",
            },
        },
        editTextField: {
            width: "256px",
            "& .MuiOutlinedInput-root": {
                height: "40px",
                maxWidth: "346px",
            },
        },
        button: {
            width: "36px",
            height: "36px",
            cursor: "pointer",
            position: "absolute",
            top: "2px",
            right: "2px",
        },
        icon: {
            width: "36px",
            height: "36px",
            cursor: "pointer",
            position: "absolute",
            top: "0",
            right: "0",
        },
        form: {
            marginTop: "16px",
            margin: "0 auto",
            position: "relative",
        },
        checkbox: {
            top: "2px",
        },
    })
)
