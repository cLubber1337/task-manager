import React, { memo, useEffect } from "react"
import { Box, Divider } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import { useTodoListStyles } from "features/TodoList/todolist.styles"
import { Task } from "features/Task/Task"
import {
  FilterValuesType,
  todoListActions,
  TodolistDomainType,
  todoListThunks,
} from "features/TodoList/todolist.slice"
import { taskThunks } from "features/Task/task.slice"
import { TextInputForm } from "common/components/TextInputForm"
import { AddItemForm } from "common/components/AddItemForm"
import { useTaskStyles } from "features/Task/task.styles"
import { TaskType } from "api/todolists.api"
import { TaskStatuses } from "common/enums"
import { useActions } from "common/hooks"

export type Props = {
  id: string
  title: string
  tasks: TaskType[]
  todolist: TodolistDomainType
}
export const TodoList = memo(({ title, id, tasks, todolist }: Props) => {
  const classes = useTodoListStyles()
  const useTaskClasses = useTaskStyles()
  const { changeTodolistFilter } = useActions(todoListActions)
  const { changeTitleTodoListThunk, deleteTodoListThunk } = useActions(todoListThunks)
  const { createTasksThunk, fetchTasks } = useActions(taskThunks)

  useEffect(() => {
    fetchTasks(id)
  }, [id])

  const deleteTodoList = () => {
    deleteTodoListThunk(id)
  }

  const changeTitleTodoList = (title: string) => {
    changeTitleTodoListThunk({ id, title })
  }

  const addTaskCallBack = (title: string) => {
    return createTasksThunk({ todolistId: id, title }).unwrap()
  }

  const combinedFilterHandler = (filter: FilterValuesType) => {
    changeTodolistFilter({ id: todolist.id, filter })
  }

  let tasksForTodolist = tasks

  if (todolist.filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New)
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed)
  }

  return (
    <>
      <TextInputForm
        className={classes}
        changeTitleCallBack={changeTitleTodoList}
        deleteCallBack={deleteTodoList}
        currentTitle={title}
        toolTipTitle="Delete todoList"
      />
      <Divider className={classes.divider} />

      <AddItemForm
        className={useTaskClasses}
        addItem={addTaskCallBack}
        placeholder="Add a new task"
      />

      {tasksForTodolist.map((task) => (
        <Task key={task.id} task={task} todolistId={id} />
      ))}

      <Box mt={4} className={classes.buttons}>
        <Button
          onClick={() => combinedFilterHandler("all")}
          variant={todolist.filter === "all" ? "contained" : "text"}
          color="primary"
        >
          All
        </Button>
        <Button
          onClick={() => combinedFilterHandler("active")}
          className={classes.button}
          variant={todolist.filter === "active" ? "contained" : "text"}
          color="primary"
        >
          Active
        </Button>
        <Button
          onClick={() => combinedFilterHandler("completed")}
          className={classes.button}
          variant={todolist.filter === "completed" ? "contained" : "text"}
          color="primary"
        >
          Completed
        </Button>
      </Box>
    </>
  )
})
