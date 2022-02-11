import { COLOR } from 'constants/';
import React from 'react';
import styled from 'styled-components';
import { ChatForm } from './ChatForm';
import { ChatList } from './ChatList';
import { ChatSideNav } from './ChatSideNav';

export const ChatContainer = () => {
  return (
    <ChatBox>
      <ChatTitle>#PreOnboarding</ChatTitle>
      <ChatList />
      <ChatForm />
      <ChatSideNav />
    </ChatBox>
  );
};

const ChatBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50rem;
  height: 100%;
  padding: 2em;
  background-color: ${COLOR.MAIN_LIGHT};
`;

const ChatTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;
