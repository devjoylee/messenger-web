import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthPage } from 'pages/authPage';
import { getUsers } from 'redux/actions/getUsers';
import { RootState } from 'redux/reducers';
import { getUser } from 'utils/getUser';
import { ChatPage } from 'pages/chatPage';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const response = await getUser('users');
      dispatch(getUsers(response));
      return;
    };
    getData();
  }, [dispatch]);
  const {
    auth: { currentUser },
  } = useSelector((state: RootState) => state);
  return <div className="App">{currentUser ? <ChatPage /> : <AuthPage />}</div>;
};

export default App;
