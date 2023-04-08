import React, {FC, useCallback} from 'react';
import {Box, Checkbox} from "@material-ui/core";
import {useTaskStyles} from "features/Task/task.styles";
import {useAppDispatch} from "utils/store.hook";
import {deleteTasksThunk, updateTasksThunk} from "features/Task/task.slice";
import {TextInputForm} from "common/components/TextInputForm";
import {TaskType} from "api/todolists.api";


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
        dispatch(updateTasksThunk({taskId: task.id, domainModel: {title}, todolistId}))
    }, [dispatch, task.id, todolistId])


    return (
        <Box className={classes.content}>
            <Checkbox className={classes.checkbox} color={"primary"}/>
            <TextInputForm className={classes}
                           deleteCallBack={deleteTask}
                           currentTitle={task.title}
                           changeTitleCallBack={changeTaskTitle}
                           toolTipTitle="Delete task"
            />
        </Box>
    );
};

