import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { ChatMessage } from './ChatMessage';
import { Content } from 'types';
import styled from 'styled-components';

export const ChatList = () => {
  const {
    content: { content },
  } = useSelector((state: RootState) => state);

  // users.sort((a: User, b: User) => a.content.date - b.content.date);
  return (
    <ListContainer>
      {content.map((content: Content, i: number) => {
        return <ChatMessage key={`message-${i}`} content={content} />;
      })}
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
