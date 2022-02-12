import styled from 'styled-components';
import { ChatContainer } from 'components/chat';

export const ChatPage = () => {
  return (
    <PageContainer>
      <ChatContainer />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
`;
