import styled from 'styled-components';
import { useState } from 'react';
import { COLOR } from 'constants/';
import { ChatForm, ChatList, ChatSideNav } from './';

export const ChatContainer = () => {
  const [toBottom, setToBottom] = useState(false);

  return (
    <ChatBox>
      <ChatTitle>#PreOnboarding</ChatTitle>
      <ChatList toBottom={toBottom} />
      <ChatForm setToBottom={setToBottom} />
      <ChatSideNav />
    </ChatBox>
  );
};

const ChatBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc(100% - 7rem);
  height: 100vh;
  padding: 2em;
  background-color: ${COLOR.MAIN_LIGHT};
`;

const ChatTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;
