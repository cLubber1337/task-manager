import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useTodoListAdderStyles = makeStyles(() =>
  createStyles({
    content: {
      padding: "10px",
      backgroundColor: "pink",
      position: "sticky",
      top: "72px",
      zIndex: 5,
    },
    form: {
      position: "relative",
      margin: "0 auto",
      maxWidth: "320px",
      marginTop: "18px",
    },
    textField: {
      width: "100%",
      position: "relative",
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
    },
  })
)
