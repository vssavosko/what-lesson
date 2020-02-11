import React from 'react';

import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
`;

export const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
    </>
  );
};
