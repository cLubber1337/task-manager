import { makeStyles, createStyles } from "@material-ui/core/styles"

export const useAppStyles = makeStyles((theme) =>
  createStyles({
    content: {
      backgroundColor: "pink",
      backgroundRepeat: "repeat-y",
      minHeight: "100vh",
      [theme.breakpoints.up("lg")]: {
        minHeight: "100vh",
        backgroundRepeat: "repeat-y",
      },
    },
  })
)
