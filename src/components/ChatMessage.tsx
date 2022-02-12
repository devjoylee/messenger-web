import { Content } from 'types';
import { getDate } from 'utils/getDate';
import styled from 'styled-components';
import { COLOR } from 'constants/';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { removeContent } from 'redux/actions/removeContent';
import { removeContentData } from 'utils/removeContentData';
import { editContentData } from 'utils/editContentData';
import { useState } from 'react';
import { editContent } from 'redux/actions/editContent';
import { setReplyUser } from 'redux/actions/setReplyUser';

interface ChatMessageProps {
  message: Content;
}
interface StyleProps {
  isLogged: boolean;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const {
    content: { content },
    auth: { currentUser, users },
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  const user = users.filter(
    (user: Content) => user.userId === message.userId
  )[0];

  const isLogged = currentUser.userId === user.userId;

  const showRemoveText = (): void | string => {
    if (message.text.length >= 10) {
      return message.text.substr(0, 10) + '...';
    }
  };

  const handleRemove = () => {
    if (
      window.confirm(showRemoveText() + '메시지를 삭제하시겠습니까??') === true
    ) {
      const newContents = content.filter(
        (data: Content) => data.uuid !== message.uuid
      );
      dispatch(removeContent(newContents));
      removeContentData(newContents);
    } else {
      return false;
    }
  };

  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(message.text);

  const handleUpdate = () => {
    setEdit(!edit);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };

  const handleEdit = async () => {
    setEdit(!edit);
    const newContent = await editContentData(message, text);
    const editContents = [
      ...newContent,
      {
        uuid: message.uuid,
        text: text,
        date: message.date,
        userId: message.userId,
      },
    ];

    dispatch(editContent(editContents));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleEdit();
      return;
    }
  };

  const handleReply = () => {
    dispatch(setReplyUser(user));
  };

  return (
    <MessageContainer>
      <ImageBox>
        <Avatar src={user.profileImage} alt={user.userName} />
      </ImageBox>
      <MessageBox>
        <MessageInfo>
          <NameDateBox>
            <Name isLogged={isLogged}>
              {user.userName} {isLogged && '*'}
            </Name>
            <DateString>{getDate(message.date)}</DateString>
          </NameDateBox>
          <ControlBox>
            <span onClick={handleReply}>⏎</span>
            {isLogged && (
              <>
                <span onClick={handleUpdate}>✏️</span>
                <span onClick={handleRemove}>🗑️</span>
              </>
            )}
          </ControlBox>
        </MessageInfo>
        {edit === false ? (
          <Message>{message.text}</Message>
        ) : (
          <EditFormContainer onKeyDown={e => handleKeyDown(e)}>
            <EditInput
              defaultValue={message.text}
              onChange={e => handleChange(e)}
              autoFocus
            ></EditInput>
            <Edit onClick={handleEdit}>✅</Edit>
          </EditFormContainer>
        )}
      </MessageBox>
    </MessageContainer>
  );
};

const MessageContainer = styled.li`
  display: flex;
  width: 100%;
  height: 5rem;
  & + li {
    margin-top: 20px;
  }
`;
const ImageBox = styled.div`
  height: 100%;
`;
const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: dodgerblue;
  margin-right: 1.5rem;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 3.5rem;
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
  font-size: 1rem;
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
  font-size: 1rem;

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
  height: fit-content;
  line-height: 1.5rem;
  white-space: pre-line;
`;
const EditFormContainer = styled.form`
  display: flex;
  margin-top: 10px;
`;
const EditInput = styled.textarea`
  font-size: 1rem;
  width: 50%;
  height: 3vh;
  padding-left: 5px;
  background-color: #fff;
  color: #000;
  border-radius: 2px;
`;
const Edit = styled.div`
  font-size: 1.4rem;
  cursor: pointer;
`;
