import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import styled from 'styled-components';
import { User } from 'types/user';

export const ChatSideNav = () => {
  const {
    auth: { users },
  } = useSelector((state: RootState) => state);
  return (
    <NavContainer>
      {users.map((user: User) => (
        <img src={user.profileImage} alt="profile" />
      ))}
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 0;
  top: 0;
  width: 7rem;
  height: 100vh;
  transform: translateX(100%);
  padding: 2em 0.5em;
  box-shadow: 5px 0px 1px 0px rgba(0, 0, 0, 0.48);
  & > img {
    width: 3.5rem;
    height: 3.5rem;
    margin-bottom: 2rem;
    border-radius: 50%;
  }
`;
