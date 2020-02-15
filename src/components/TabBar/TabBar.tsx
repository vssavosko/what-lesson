import React from 'react';

import styled from 'styled-components';

const Bar = styled.div`
  position: absolute;
  bottom: 0;
  height: 88px;
  background-color: #F9F9F9;
  border 1px solid #F3F3F3;
`;

export const TabBar: React.FC = (props: any) => {
  return (
    <>
      <Bar>
        <p>test</p>
      </Bar>
    </>
  );
};
