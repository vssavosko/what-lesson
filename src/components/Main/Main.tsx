import React from 'react';

import styled from 'styled-components';

const Page = styled.div`
  flex-grow: 1;
`;

export const Main: React.FC = () => {
  return (
    <Page>
      <p>Main Page</p>
    </Page>
  );
};
