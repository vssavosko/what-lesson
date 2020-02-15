import React from 'react';

import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  height: 88px;
  border 1px solid #F3F3F3;
  background-color: #F9F9F9;
  justify-content: center;
  align-items: flex-end;
`;
const Title = styled.p`
  padding-bottom: 12px;
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
