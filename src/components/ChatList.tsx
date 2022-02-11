import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { ChatMessage } from './ChatMessage';
import { User } from 'types/user';
import styled from 'styled-components';

export const ChatList = () => {
  const {
    auth: { users },
  } = useSelector((state: RootState) => state);

  return (
    <ListContainer>
      {users.map((user: User) => (
        <ChatMessage key={user.userId} user={user} />
      ))}
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
