import React, {FC} from 'react';


type TodoListType = {
    title: string
}


export const TodoList: FC <TodoListType> = ({title}) => {

    return (
        <div>
            <span>{title}</span>
        </div>
    );
};

