import React from 'react';

import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  height: 44px;
  border-bottom: 2px solid #f3f3f3;
  background-color: #f9f9f9;
  justify-content: center;
  align-items: center;
`;
const Title = styled.p`
  font-family: SFProTextSemibold, Fallback, sans-serif;
`;

export const HeaderBar: React.FC = () => {
  return (
    <>
      <Header>
        <Title>What Lesson</Title>
      </Header>
    </>
  );
};
