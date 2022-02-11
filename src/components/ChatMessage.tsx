import { Context, User } from 'types';
import { getDate } from 'utils/getDate';
import styled from 'styled-components';
import { COLOR } from 'constants/';

interface ChatMessageProps {
  user: User;
  currentUser: User;
  content: Context;
}

interface StyleProps {
  isLogged: boolean;
}

export const ChatMessage = ({
  user,
  currentUser,
  content,
}: ChatMessageProps) => {
  const { userId, userName, profileImage } = user;

  const isLogged = currentUser.userId === userId;

  return (
    <MessageContainer>
      <Avatar src={profileImage} alt={userName} />
      <MessageBox>
        <MessageInfo>
          <NameDateBox>
            <Name isLogged={isLogged}>
              {userName} {isLogged && '⭐'}
            </Name>
            <DateString>{getDate(content.date)}</DateString>
          </NameDateBox>
          {isLogged && (
            <ControlBox>
              <span>✏️</span>
              <span>🗑️</span>
            </ControlBox>
          )}
        </MessageInfo>
        <Message>{content.text}</Message>
      </MessageBox>
    </MessageContainer>
  );
};

const MessageContainer = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  & + li {
    margin-top: 20px;
  }
`;

const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: dodgerblue;
  margin-right: 1.5rem;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  flex: 1;
  width: 30rem;
`;

const MessageInfo = styled.div`
  display: flex;
  justify-content: space-between;
  height: 1.5rem;
  margin-right: 2rem;
`;

const NameDateBox = styled.div`
  display: flex;
`;

const Name = styled.span<StyleProps>`
  font-size: 1.2rem;
  font-weight: 600;
  margin-right: 1rem;
  color: ${({ isLogged }) => (isLogged ? COLOR.LOGGED : '#fff')};
`;

const DateString = styled.span`
  color: #d1d1d1;
`;

const ControlBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 25px;

  span {
    cursor: pointer;
    display: inline-block;
    & + span {
      margin-left: 1rem;
    }
  }
`;

const Message = styled.p`
  padding: 0.5em 0;
`;
