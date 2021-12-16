import React from 'react';
import { TasksCollection } from '/imports/api/TasksCollection';

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

    const onDeleteChecked = () => {
        list.forEach(listItem => {
            if (listItem.isChecked)
                TasksCollection.remove(listItem._id);
        });

    };

    return (
        <ul>
            {list.map((task, index) => (
                <li key={index}>
                    <input type="checkbox" checked={!!task.isChecked} onClick={() => onCheckboxClick(task)} readOnly />
                    <span style={!task.isChecked ? {} : { textDecorationLine: 'line-through' }} class="alltasks">{task.text}</span>
                    <button class="delete" onClick={() => onDeleteClick(task)}>delete</button>
                    <button class="edit" onClick={() => onTaskSelect(task)}>edit</button>
                </li>
            ))}
            <button class="deletechecked" onClick={() => onDeleteChecked()}>delete completed tasks</button>
        </ul>
    );
};