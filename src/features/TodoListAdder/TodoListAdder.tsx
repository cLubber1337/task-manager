import React from "react"
import { useTodoListAdderStyles } from "features/TodoListAdder/todolistAdder.styles"
import { AddItemForm } from "common/components/AddItemForm"
import { todoListThunks } from "features/TodoList/todolist.slice"
import { useActions } from "common/hooks"

export const TodoListAdder = () => {
  const classes = useTodoListAdderStyles()
  const { createTodoListThunk } = useActions(todoListThunks)

  const addTodoListCallBack = (title: string) => {
    return createTodoListThunk(title).unwrap()
  }

  return (
    <AddItemForm
      className={classes}
      addItem={addTodoListCallBack}
      placeholder="Write the name of your Todolist"
    />
  )
}
