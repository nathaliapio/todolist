import React, { useEffect, useState } from 'react';
import { TasksCollection } from '/imports/api/TasksCollection';

//array text está o valor armazenado que será usado, nesse caso uma string
//o setText é para atualizar esse valor
//onSubmit envia para o formulario
//useState armazena o value do <input>
export const TaskForm = ({ task }) => {
    const [text, setText] = useState("");
    const [id, setId] = useState(0);

    useEffect(() => {
        if (task) {
            setText(task.text);
            setId(task._id);
        }
    }, [task]);

    const handleSubmit = e => {
        e.preventDefault();

        if (!text) return;

        if (id === 0) {
            TasksCollection.insert({
                text: text.trim(),
                createdAt: new Date()
            });
        } else {
            TasksCollection.update({
                _id: id
            }, {
                $set: {
                    text: text.trim(),
                    updatedAt: new Date()
                }
            });
        }

        setText("");
        setId(0);
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Type here to add new task"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />


            <button type="submit">{id === 0 ? 'Add on' : 'Save'}</button>

        </form>
    );
};
//fazer o if do button