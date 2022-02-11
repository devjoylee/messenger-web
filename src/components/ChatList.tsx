import { useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { ChatMessage } from './ChatMessage';
import { Content } from 'types';
import styled from 'styled-components';

interface ChatListProps {
  toBottom: boolean;
  setToBottom: Dispatch<SetStateAction<boolean>>;
}

export const ChatList = ({ toBottom, setToBottom }: ChatListProps) => {
  const {
    content: { content },
  } = useSelector((state: RootState) => state);
  const chatListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (chatListRef.current) {
      const chat = chatListRef.current.children;
      chat[chat.length - 1].scrollIntoView();
      if (toBottom) {
        chat[chat.length - 1].scrollIntoView({
          behavior: 'smooth',
        });
        setToBottom(false);
      }
    }
  });

  content.sort((a: Content, b: Content) => a.date - b.date);

  return (
    <ListContainer ref={chatListRef}>
      {content.map((content: Content, i: number) => {
        return <ChatMessage key={`message-${i}`} content={content} />;
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
`;
