import { ChatContainer } from 'components/ChatContainer';
import styled from 'styled-components';

export const ChatPage = () => {
  return (
    <PageContainer>
      <ChatContainer />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;
