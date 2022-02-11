import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthPage } from 'pages/authPage';
import { getUsers } from 'redux/actions/getUsers';
import { RootState } from 'redux/reducers';
import { getUserData } from 'utils/getUserData';
import { ChatPage } from 'pages/chatPage';
import { getContentData } from 'utils/getContentData';
import { getContent } from 'redux/actions/getContent';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userFetch = async () => {
      const response = await getUserData('users');
      dispatch(getUsers(response));
      return;
    };
    userFetch();
    const contextFetch = async () => {
      const response = await getContentData();
      dispatch(getContent(response));
    };
    contextFetch();
  }, [dispatch]);
  const {
    auth: { currentUser },
    content: { content },
  } = useSelector((state: RootState) => state);
  return (
    <div className="App">
      {currentUser && content.length > 0 ? <ChatPage /> : <AuthPage />}
    </div>
  );
};

export default App;
