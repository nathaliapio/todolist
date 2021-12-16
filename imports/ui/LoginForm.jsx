import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = e => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  };

  return (
    <form onSubmit={submit} className="login-form">
      <label class="labeluser" htmlFor="username">Username</label>

      <input
        class="user"
        type="text"
        placeholder="Username"
        name="username"
        required
        onChange={e => setUsername(e.target.value)}
      />

      <label class="labelpassword" htmlFor="password">Password</label>

      <input
        class="password"
        type="password"
        placeholder="Password"
        name="password"
        required
        onChange={e => setPassword(e.target.value)}
      />

      <button class="inputlogin" type="submit">Log In</button>
    </form>
  );
};