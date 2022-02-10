import { ChatContainer } from 'components/ChatContainer';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import styled from 'styled-components';

export const ChatPage = () => {
  const {
    auth: { currentUser, users },
  } = useSelector((state: RootState) => state);
  console.log(currentUser, users);
  return (
    <PageContainer>
      <ChatContainer />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;
