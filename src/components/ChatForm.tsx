import { COLOR } from 'constants/';
import React from 'react';
import styled from 'styled-components';

export const ChatForm = () => {
  return (
    <FormConatiner>
      <TextInput type="text" placeholder="메시지를 입력하세요" />
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
