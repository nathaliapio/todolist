import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';

export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());
  const [taskSelected, setTaskSelected] = useState(null);

  return (
    <div id="app">
      <h1>To-Do List:</h1>

      <TaskForm task={taskSelected} />

      <TaskList list={tasks} onTaskSelect={setTaskSelected} />
    </div>
  );
};