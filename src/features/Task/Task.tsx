import React, {ChangeEvent, FC, useCallback} from 'react';
import {Box, Checkbox} from "@material-ui/core";
import {useTaskStyles} from "features/Task/task.styles";
import {useAppDispatch, useAppSelector} from "common/hooks/store.hook";
import {deleteTasksThunk, updateTasksThunk} from "features/Task/task.slice";
import {TextInputForm} from "common/components/TextInputForm";
import {TaskType} from "api/todolists.api";
import {TaskStatuses} from "common/enums";
import clsx from "clsx";
import {getAppStatus} from "app/app.selector";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task: FC<TaskPropsType> = ({task, todolistId}) => {
    const classes = useTaskStyles()
    const dispatch = useAppDispatch()
    const status = useAppSelector(getAppStatus)

    const deleteTask = useCallback(() => {
        dispatch(deleteTasksThunk({todolistId, taskId: task.id}))
    }, [dispatch, todolistId, task.id])

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(updateTasksThunk({taskId: task.id, domainModel: {title}, todolistId}))
    }, [dispatch, task.id, todolistId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTasksThunk({taskId: task.id, domainModel: {status: e.currentTarget.checked ?
                    TaskStatuses.Completed : TaskStatuses.New}, todolistId}))
    }, [task.id, todolistId]);


    return (
        <Box className={clsx(classes.content, task.status === TaskStatuses.Completed && classes.checked)   }>
            <Checkbox onChange={onChangeHandler}
                      checked={task.status === TaskStatuses.Completed}
                      className={classes.checkbox}
                      color={"primary"}/>

            <TextInputForm className={classes}
                           deleteCallBack={deleteTask}
                           currentTitle={task.title}
                           changeTitleCallBack={changeTaskTitle}
                           toolTipTitle="Delete task"
                           disabled={status === 'loading'}
            />
        </Box>
    );
};

