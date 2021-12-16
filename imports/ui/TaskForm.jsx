import React, { useEffect, useState } from 'react';
import { TasksCollection } from '/imports/api/TasksCollection';
import { useTracker } from 'meteor/react-meteor-data';

export const TaskForm = ({ task }) => {
    const [text, setText] = useState("");
    const [id, setId] = useState(0);
    const user = useTracker(() => Meteor.user());

    useEffect(() => {
        if (task) {
            setText(task.text);
            setId(task._id);
        }
    }, [task]);

    const handleSubmit = e => {
        console.log(user)
        e.preventDefault();

        if (!text) return;

        if (id === 0) {
            TasksCollection.insert({
                text: text.trim(),
                createdAt: new Date(),
                userId: user._id
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
                className="upperinput"
                type="text"
                placeholder="Type here to add new task"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button className="add" type="submit">{id === 0 ? 'add' : 'save'}</button>

        </form>
    );
};