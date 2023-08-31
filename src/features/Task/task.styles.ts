import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useTaskStyles = makeStyles(() =>
  createStyles({
    content: {
      display: "flex",
      justifyContent: "space-between",
      gap: "8px",
      marginTop: "4px",
      alignItems: "center",
      width: "100%",
      wordBreak: "break-all",
    },
    checked: {
      textDecoration: "line-through",
      opacity: 0.5,
    },
    title: {
      fontFamily: "cursive",
      width: "100%",
      wordWrap: "break-word",
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
      width: "100%",
    },
    button: {
      position: "absolute",
      top: "-4px",
      right: "-2px",
    },
    buttonGroup: {
      display: "flex",
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
