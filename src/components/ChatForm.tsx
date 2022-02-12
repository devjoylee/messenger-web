import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { COLOR } from 'constants/';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/reducers';
import { updateContentData } from 'utils/updateContentData';
import { updateContent } from 'redux/actions/updateContent';
import { v4 as uuidv4 } from 'uuid';
import { setReplyUser } from 'redux/actions/setReplyUser';

interface ChatFormProps {
  setToBottom: Dispatch<SetStateAction<boolean>>;
}

export const ChatForm = ({ setToBottom }: ChatFormProps) => {
  const [text, setText] = useState('');
  const {
    auth: { currentUser, toReply },
    content: { content },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newContent = {
      uuid: uuidv4().slice(-10),
      text: text,
      date: new Date().getTime(),
      userId: currentUser.userId,
    };
    const updatedContent = [...content, newContent];
    if (text) {
      dispatch(updateContent(updatedContent));
      updateContentData(newContent);
      setToBottom(true);
      setText('');
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setTimeout(() => {
        buttonRef.current?.click();
      }, 100);
      return;
    }
  };
  useEffect(() => {
    if (toReply) {
      const replyTemplate = `${toReply.userName}\n ${text} \n (회신)`;
      setText(replyTemplate);
      dispatch(setReplyUser(null));
      return;
    }
  }, [toReply]);
  return (
    <FormConatiner onSubmit={handleSubmit} onKeyDown={e => handleKeyDown(e)}>
      <TextInput
        value={text}
        placeholder="메시지를 입력하세요"
        onChange={e => handleChange(e)}
        rows={1}
      />
      <Button type="submit" ref={buttonRef}>
        ➣
      </Button>
    </FormConatiner>
  );
};

const FormConatiner = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLOR.MAIN};
  width: 100%;
  height: 5rem;
  padding: 0 2em;
  border-radius: 15px;
`;

const TextInput = styled.textarea`
  flex: 1;
  font-size: 1.2rem;
  resize: none;
  &::placeholder {
    color: #ffffff;
  }
`;
const Button = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 2rem;
  border-radius: 50px;
  font-size: 1rem;
  background-color: ${COLOR.BUTTON};
  cursor: pointer;
`;
