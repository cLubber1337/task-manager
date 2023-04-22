import React from "react"
import { useTodoListAdderStyles } from "features/TodoListAdder/todolistAdder.styles"
import { AddItemForm } from "common/components/AddItemForm"
import { todoListThunks } from "features/TodoList/todolist.slice"
import { useActions } from "common/hooks"
import { Box } from "@mui/material"

export const TodoListAdder = () => {
  const classes = useTodoListAdderStyles()
  const { createTodoListThunk } = useActions(todoListThunks)

  const addTodoListCallBack = (title: string) => {
    return createTodoListThunk(title).unwrap()
  }

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop)
      window.scrollTo(0, c - c / 8)
    }
  }

  return (
    <Box className={classes.content}>
      <AddItemForm
        scrollToTop={scrollToTop}
        className={classes}
        addItem={addTodoListCallBack}
        placeholder="Write the name of your Todolist"
      />
    </Box>
  )
}
