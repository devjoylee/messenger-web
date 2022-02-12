import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { User } from 'types';
import { AuthProfileBox } from './AuthProfileBox';

export const AuthContainer = () => {
  const {
    auth: { users },
  } = useSelector((state: RootState) => state);
  return (
    <AuthBox>
      <SelectBox>
        <AuthTitle>유저를 선택해주세요!</AuthTitle>
        <ProfileUl>
          {users.map((user: User) => (
            <AuthProfileBox key={user.userId} user={user} />
          ))}
        </ProfileUl>
      </SelectBox>
    </AuthBox>
  );
};

const AuthBox = styled.div`
  width: 70rem;
  height: 40rem;
  padding: 2em;
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const AuthTitle = styled.h2`
  text-align: center;
  font-size: 2.4rem;
  font-weight: 900;
  margin-bottom: 1rem;
`;

const ProfileUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`;
