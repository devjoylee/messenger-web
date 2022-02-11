import React from 'react';
import styled from 'styled-components';
import { ChatMessage } from './ChatMessage';

export const ChatList = () => {
  return (
    <ListContainer>
      <ChatMessage />
    </ListContainer>
  );
};

const ListContainer = styled.ul`
  width: 100%;
  flex: 1;
  height: 42rem;
  margin-bottom: 1rem;
  overflow-y: scroll;
`;
