import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getUser } from 'utils/getUser';

const App = () => {
  const [user, setUser] = useState([]);
  const [others, setOthers] = useState([]);
  const currentUser = 'currentUser';
  const users = 'users';
  useEffect(() => {
    getUser(currentUser).then(data => setUser(data));
    getUser(users).then(data => setOthers(data));
  }, []);
  console.log(user);
  console.log(others);

  return <div className="App"></div>;
};

export default App;
