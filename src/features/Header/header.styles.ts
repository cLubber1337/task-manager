import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useHeaderStyles = makeStyles(() =>
  createStyles({
    root: {
      background: "pink",
      position: "sticky",
      paddingTop: "40px",
      paddingBottom: "40px",
      zIndex: 5,
      cursor: "pointer",
    },
    title: {
      flexGrow: 1,
      fontFamily: "cursive",
      textAlign: "center",
    },
  })
)
