import React from 'react';

import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  height: 44px;
  border-bottom: 1px solid #f3f3f3;
  background-color: #f9f9f9;
  justify-content: center;
  align-items: center;
`;
const Title = styled.p`
  font-family: SFProTextSemibold, Fallback, sans-serif;
  font-size: 17px;
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
