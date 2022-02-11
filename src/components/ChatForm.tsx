import { COLOR } from 'constants/';
import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from 'server/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';

export const ChatForm = () => {
  const {
    auth: { currentUser },
  } = useSelector((state: RootState) => state);
  const [text, setText] = useState('');

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    setText(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(currentUser.content);

    await updateDoc(doc(db, 'users', currentUser.docId), {
      content: [
        currentUser.content,
        {
          text: text,
          date: new Date(),
        },
      ],
    });
  };
  return (
    <FormConatiner onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="메시지를 입력하세요"
        onChange={handleChange}
        onKeyUp={e => handleChange(e)}
      />
      <Button type="submit" value="전송" />
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
const Button = styled.input`
  width: 4.5rem;
  height: 2.5rem;
  margin-left: 2rem;
  border-radius: 15px;
  font-size: 1rem;
  background-color: ${COLOR.BUTTON};
`;
