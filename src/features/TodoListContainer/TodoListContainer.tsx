import React, { useEffect } from "react"
import { Grid, Paper } from "@material-ui/core"
import { useAppSelector } from "common/hooks/store.hook"
import { TodoList } from "features/TodoList/TodoList"
import { getTodoLists } from "features/TodoList/todolist.selector"
import { useTodoListContainerStyles } from "features/TodoListContainer/todolistContainer.styles"
import { getTasks } from "features/Task/task.selector"
import { getIsLoggedIn } from "features/Login/auth.selector"
import { Navigate } from "react-router-dom"
import { todoListThunks } from "features/TodoList/todolist.slice"
import { useActions } from "common/hooks"

export const TodoListContainer = () => {
  const classes = useTodoListContainerStyles()
  const { fetchTodoLists } = useActions(todoListThunks)
  const todoList = useAppSelector(getTodoLists)
  const tasks = useAppSelector(getTasks)
  const isLoggedIn = useAppSelector(getIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    fetchTodoLists({})
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <Grid container spacing={2} className={classes.content}>
      {todoList.map((tl) => {
        let allTodolistTasks = tasks[tl.id]
        return (
          <Grid item className={classes.grid} key={tl.id}>
            <Paper className={classes.paper}>
              <TodoList {...tl} todolist={tl} tasks={allTodolistTasks} />
            </Paper>
          </Grid>
        )
      })}
    </Grid>
  )
}
