import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { ChatMessage } from './ChatMessage';
import { User } from 'types/user';
import styled from 'styled-components';

export const ChatList = () => {
  const {
    auth: { users, currentUser },
  } = useSelector((state: RootState) => state);

  users.sort((a: User, b: User) => a.content.date - b.content.date);

  return (
    <ListContainer>
      {users.map((user: User) => {
        const { date, text } = user.content;
        return (
          date &&
          text && (
            <ChatMessage
              key={user.userId}
              user={user}
              currentUser={currentUser}
            />
          )
        );
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
