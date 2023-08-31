import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useLoginStyles = makeStyles(() =>
  createStyles({
    main: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "100px",
      flexDirection: "column",
    },
    error: {
      color: "red",
      fontWeight: "bold",
      margin: 0,
    },
    textField: {
      margin: "10px 0",
    },
    h1: {
      color: "#9c27b0",
    },
  })
)
