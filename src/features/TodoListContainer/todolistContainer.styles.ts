import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useTodoListContainerStyles = makeStyles((theme) =>
  createStyles({
    content: {
      marginTop: "20px",
      justifyContent: "center",
      [theme.breakpoints.up("lg")]: {
        justifyContent: "flex-start",
      },
    },
    grid: {
      margin: "4px",
    },
    paper: {
      padding: "12px",
      maxWidth: "350px",
    },
  })
)
