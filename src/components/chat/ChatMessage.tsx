import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { removeContent, editContent, setReplyContent } from 'redux/actions';
import { getDate, removeContentData, editContentData } from 'utils';
import { COLOR, INPUT_HEIGHT } from 'constants/';
import { Content } from 'types';

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
    const replyObj = { content: message, userName: user.userName };
    dispatch(setReplyContent(replyObj));
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
            <Edit onClick={handleEdit}>v</Edit>
          </EditFormContainer>
        )}
      </MessageBox>
    </MessageContainer>
  );
};

const MessageContainer = styled.li`
  display: flex;
  width: 100%;
  & + li {
    margin-top: 25px;
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
  flex: 1;
  width: 30rem;
  margin-top: 3px;
`;

const MessageInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 2rem;
`;

const NameDateBox = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.span<StyleProps>`
  font-size: 1rem;
  font-weight: 600;
  margin-right: 1rem;
  color: ${({ isLogged }) => (isLogged ? COLOR.LOGGED : COLOR.TEXT)};
`;

const DateString = styled.span`
  opacity: 0.6;
  font-size: 14px;
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
  padding-top: 0.3em;
  height: fit-content;
  line-height: 1.5rem;
  white-space: pre-line;
`;
const EditFormContainer = styled.form`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;
const EditInput = styled.textarea`
  font-size: 1rem;
  width: 50%;
  height: ${INPUT_HEIGHT};
  padding: 10px;
  font: inherit;
  background-color: ${COLOR.MAIN};
  color: ${COLOR.TEXT};
  border-radius: 3px;
  resize: none;
`;
const Edit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  width: 38px;
  margin-left: 0.5rem;
  font-size: 1rem;
  background-color: ${COLOR.BUTTON};
  border-radius: 3px;
  cursor: pointer;
`;
