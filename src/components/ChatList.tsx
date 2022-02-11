import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { ChatMessage } from './ChatMessage';
import { Content } from 'types';
import styled from 'styled-components';
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
    content.sort((a: Content, b: Content) => a.date - b.date);
  }, [content]);

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
  flex: 1;
  height: 42rem;
  margin-bottom: 1rem;
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
