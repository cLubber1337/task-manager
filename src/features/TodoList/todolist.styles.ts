import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useTodoListStyles = makeStyles(() =>
  createStyles({
    content: {
      display: "flex",
      justifyContent: "space-between",
    },
    title: {
      fontFamily: "cursive",
      paddingLeft: "8px",
      fontSize: "22px",
    },
    button: {
      marginLeft: "16px",
    },
    divider: {
      height: "4px",
      marginTop: "12px",
      backgroundImage: "linear-gradient(to right, purple, pink)",
    },
    editTextField: {
      height: "32px",
      bottom: "14px",
      "& .MuiOutlinedInput-root": {
        height: "40px",
        maxWidth: "346px",
      },
    },
    AddItemForm: {
      marginTop: "16px",
    },
    buttons: {
      textAlign: "center",
    },
  })
)
