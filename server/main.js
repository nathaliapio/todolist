import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';

const insertTask = taskText => TasksCollection.insert({ text: taskText });

//tá importando TasksCollection e adicionando as tarefas por um array de strings
//agora precisa renderizar as tarefas usando uma função (useTracker from 'meteor/react-meteor-data') do react e um hook
//hook permite usar um state sem escrever uma classe

Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask)
  }
});