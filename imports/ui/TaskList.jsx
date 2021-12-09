import React from 'react';
import { TasksCollection } from '/imports/api/TasksCollection';

//readOnly, pois onChange atualiza o estado
//precisa forçar o checked para boolean

export const TaskList = ({ list, onTaskSelect }) => {
    const onCheckboxClick = (task) => {
        TasksCollection.update(task._id, {
            $set: {
                isChecked: !task.isChecked
            }
        });
    };

    const onDeleteClick = (task) => {
        TasksCollection.remove(task._id);
    };

    return (
        <ul>
            {list.map((task, index) => (
                <li key={index}>
                    <input
                        type="checkbox"
                        checked={!!task.isChecked}
                        onClick={() => onCheckboxClick(task)}
                        readOnly
                    />
                    <span>{task.text}</span>
                    <button onClick={() => onDeleteClick(task)}>&times;</button>
                    <button onClick={() => onTaskSelect(task)}>edit</button>
                </li>
            ))}
        </ul>
    );
};