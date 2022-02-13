import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getContent } from 'redux/actions';
import { RootState } from 'redux/reducers';
import { AuthPage, ChatPage } from 'pages';
import { getUserData, getContentData } from 'utils';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetcher = async () => {
      const userResponse = await getUserData('users');
      dispatch(getUsers(userResponse));
      const contentResponse = await getContentData();
      dispatch(getContent(contentResponse));
      return;
    };
    fetcher();
  }, [dispatch]);

  const {
    auth: { currentUser },
  } = useSelector((state: RootState) => state);
  return <div className="App">{currentUser ? <ChatPage /> : <AuthPage />}</div>;
};

export default App;
