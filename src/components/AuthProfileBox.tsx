import React from 'react';
import styled from 'styled-components';
import { User } from 'types/user';

interface Props {
  user: User;
}
export const AuthProfileBox = ({ user }: Props) => {
  return (
    <ProfileBox>
      <img src={user.profileImage} alt="profile" />
      <h3>{user.userName}</h3>
    </ProfileBox>
  );
};

const ProfileBox = styled.li`
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 17rem;
  transition: transform 0.2s ease-out;
  cursor: pointer;
  & > img {
    width: 100%;
    height: 15rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    background-color: #eaeaea;
  }
  & > h3 {
    text-align: center;
    font-size: 1.2rem;
  }
  &:hover {
    transform: scale(1.03);
  }
`;
