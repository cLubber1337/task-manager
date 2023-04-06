import React, {FC, useCallback} from 'react';
import {Box, Checkbox} from "@material-ui/core";
import {useTaskStyles} from "styles/task.styles";
import {TaskType} from "api/api";
import {useAppDispatch} from "redux/store.hook";
import {deleteTasksThunk, updateTasksThunk} from "redux/slices/task.slice";
import {TextInputForm} from "components/common/TextInputForm";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task: FC<TaskPropsType> = ({task, todolistId}) => {
    const classes = useTaskStyles()
    const dispatch = useAppDispatch()

    const deleteTask = useCallback(() => {
        dispatch(deleteTasksThunk({todolistId, taskId: task.id}))
    }, [dispatch, todolistId, task.id])

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(updateTasksThunk([todolistId, task.id, {title}]))
    }, [dispatch, task.id, todolistId])


    return (
        <Box className={classes.content}>
            <Checkbox/>
            <TextInputForm className={classes}
                                   deleteCallBack={deleteTask}
                                   currentTitle={task.title}
                                   changeTitleCallBack={changeTaskTitle}
                    />


        </Box>
    );
};

