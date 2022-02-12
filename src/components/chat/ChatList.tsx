import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { ChatMessage } from './';
import { Content } from 'types';
import { COLOR } from 'constants/';

interface ChatListProps {
  toBottom: boolean;
}

export const ChatList = ({ toBottom }: ChatListProps) => {
  const {
    content: { content },
  } = useSelector((state: RootState) => state);
  const chatListRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (chatListRef.current) {
      const chat = chatListRef.current.children;
      if (toBottom) {
        chat[chat.length - 1].scrollIntoView({
          behavior: 'smooth',
        });
      } else {
        chat[chat.length - 1].scrollIntoView({
          behavior: 'auto',
        });
      }
    }
  });
  content.sort((a: Content, b: Content) => a.date - b.date);

  return (
    <ListContainer ref={chatListRef}>
      {content.map((content: Content, i: number) => {
        return <ChatMessage key={`message-${i}`} message={content} />;
      })}
    </ListContainer>
  );
};

const ListContainer = styled.ul`
  width: 100%;
  padding-top: 1rem;
  margin-top: auto;
  margin-bottom: 2rem;
  overflow-y: scroll;

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${COLOR.MAIN};
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #777;
  }
`;
