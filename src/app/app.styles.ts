import { makeStyles, createStyles } from "@material-ui/core/styles"

export const useAppStyles = makeStyles((theme) =>
  createStyles({
    content: {
      backgroundColor: "pink",
      backgroundRepeat: "repeat-y",
      height: "100%",
      [theme.breakpoints.up("lg")]: {
        height: "100vh",
        backgroundRepeat: "repeat-y",
      },
    },
  })
)
