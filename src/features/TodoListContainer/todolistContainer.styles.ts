import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useTodoListContainerStyles = makeStyles(() =>
  createStyles({
    content: {
      marginTop: "60px",
      columnCount: 2,
      justifyContent: "center",
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
