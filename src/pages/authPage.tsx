import { AuthContainer } from 'components/AuthContainer';
import React from 'react';
import styled from 'styled-components';
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
  width: 100vw;
  height: 100vh;
  background-color: #1e2338;
`;
