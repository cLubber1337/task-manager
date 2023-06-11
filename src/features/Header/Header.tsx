import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { Box, LinearProgress } from "@material-ui/core"
import { useAppSelector } from "common/hooks/store.hook"
import { getAppStatus } from "app/app.selector"
import { getIsLoggedIn } from "features/Login/auth.selector"
import { useActions } from "common/hooks"
import { authThunks } from "features/Login/auth.slice"
import { useHeaderStyles } from "features/Header/header.styles"

export const Header = () => {
  const status = useAppSelector(getAppStatus)
  const isLoggedIn = useAppSelector(getIsLoggedIn)
  const { logoutThunk } = useActions(authThunks)
  const onLogoutClick = () => logoutThunk({})

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop)
      window.scrollTo(0, c - c / 8)
    }
  }

  const classes = useHeaderStyles()
  return (
    <Box className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography onClick={scrollToTop} variant="h2" className={classes.title}>
            Just do it!
          </Typography>

          {isLoggedIn && (
            <Button color="inherit" onClick={onLogoutClick}>
              Log out
            </Button>
          )}
        </Toolbar>
        {status === "loading" && <LinearProgress color={"secondary"} />}
      </AppBar>
    </Box>
  )
}
