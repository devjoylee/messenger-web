import React from 'react';
import styled from 'styled-components';

export const ChatMessage = () => {
  return (
    <MessageContainer>
      <Avatar src="" alt="" />
      <MessageBox>
        <MessageInfo>
          <NameDateBox>
            <Name>Name</Name>
            <DateString>Date</DateString>
          </NameDateBox>
          <ControlBox>
            <span>수정</span>
            <span>삭제</span>
          </ControlBox>
        </MessageInfo>
        <Message>안녕하세요 임의로 만든 메시지입니다</Message>
      </MessageBox>
    </MessageContainer>
  );
};

const MessageContainer = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5rem;
  /* border: 1px solid tomato; */
`;

const Avatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: dodgerblue;
  margin-right: 1.5rem;
`;

const MessageBox = styled.div`
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
  width: 8rem;
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
  height: 3.5rem;
  padding: 0.5em 0;
`;
