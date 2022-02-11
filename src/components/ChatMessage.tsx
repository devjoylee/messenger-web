import { User } from 'types/user';
import { getDate } from 'utils/getDate';
import styled from 'styled-components';

interface ChatMessageProps {
  user: User;
}

export const ChatMessage = ({ user }: ChatMessageProps) => {
  console.log(user);

  const { userName, content, profileImage } = user;
  const { date, text } = content;

  return (
    <MessageContainer>
      <Avatar src={profileImage} alt={userName} />
      <MessageBox>
        <MessageInfo>
          <NameDateBox>
            <Name>{userName}</Name>
            <DateString>{getDate(date)}</DateString>
          </NameDateBox>
          <ControlBox>
            <span>수정</span>
            <span>삭제</span>
          </ControlBox>
        </MessageInfo>
        <Message>{text}</Message>
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
`;

const NameDateBox = styled.div`
  display: flex;
`;

const Name = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  margin-right: 1rem;
`;

const DateString = styled.span`
  color: #d1d1d1;
`;

const ControlBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 8rem;
  margin-right: 3rem;
`;

const Message = styled.p`
  padding: 0.5em 0;
`;
