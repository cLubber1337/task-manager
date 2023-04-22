import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useLoginStyles = makeStyles(() =>
  createStyles({
    error: {
      color: "red",
      fontWeight: "bold",
      margin: 0,
    },
  })
)
