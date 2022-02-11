import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { COLOR } from 'constants/';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/reducers';
import { updateContentData } from 'utils/updateContentData';
import { updateContent } from 'redux/actions/updateContent';
import { v4 as uuidv4 } from 'uuid';

interface ChatFormProps {
  setToBottom: Dispatch<SetStateAction<boolean>>;
}

export const ChatForm = ({ setToBottom }: ChatFormProps) => {
  const [text, setText] = useState('');
  const {
    auth: { currentUser },
    content: { content },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    setText(e.currentTarget.value);
  };

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

  return (
    <FormConatiner onSubmit={handleSubmit}>
      <TextInput
        type="text"
        value={text}
        placeholder="메시지를 입력하세요"
        onChange={handleChange}
        onKeyUp={e => handleChange(e)}
      />
      <Button type="submit">전송</Button>
    </FormConatiner>
  );
};

const FormConatiner = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLOR.MAIN};
  width: 100%;
  height: 3.5rem;
  padding: 0 2em;
  border-radius: 15px;
`;

const TextInput = styled.input`
  height: 100%;
  flex: 1;
  font-size: 1.2rem;
  &::placeholder {
    color: #ffffff;
  }
`;
const Button = styled.button`
  width: 4.5rem;
  height: 2.5rem;
  margin-left: 2rem;
  border-radius: 15px;
  font-size: 1rem;
  background-color: ${COLOR.BUTTON};
  cursor: pointer;
`;
