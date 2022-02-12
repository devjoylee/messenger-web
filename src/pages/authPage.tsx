import styled from 'styled-components';
import { AuthContainer } from 'components/auth';

export const AuthPage = () => {
  return (
    <PageContainer>
      <AuthContainer />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #1e2338;
`;
