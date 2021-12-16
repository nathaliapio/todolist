import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const tasks = useTracker(() => TasksCollection.find({ userId: user?._id }, { sort: { createdAt: -1 } }).fetch());
  const [taskSelected, setTaskSelected] = useState(null);
  const logout = () => Meteor.logout();

  return (
    <div id="app">
      {user ? (
        <Fragment>
          <h1>To-Do List</h1>
          <div className="userlogout" onClick={logout}>
            {user.username} 🚪
          </div>

          <TaskForm task={taskSelected} />

          <TaskList list={tasks} onTaskSelect={setTaskSelected} />

        </Fragment>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};