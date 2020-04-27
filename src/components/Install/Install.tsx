import React from 'react';

import styled from 'styled-components';
import { ShareAlternative } from '@styled-icons/entypo/ShareAlternative';
import { PlusSquare } from '@styled-icons/evaicons-solid/PlusSquare';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';

import { IProps } from './interfaces';

import WLIcon from '../../assets/images/app-icon.png';

const InstallBlock = styled.div`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 0 0 10px 10px;
  backdrop-filter: blur(4px);
  transition: 0.2s;
  z-index: 3;
`;
const AppIcon = styled.img`
  width: 60px;
  max-width: 100%;
  margin-right: 10px;
`;
const InstallTextBlock = styled.div`
  width: 100%;
  line-height: 1.5;
  margin-right: 10px;
`;
const InstallText = styled.p`
  width: 100%;
  font-family: 'SFProTextSemibold';
  font-size: 14px;
  color: white;
`;
const ShareIcon = styled(ShareAlternative)`
  width: 20px;
  fill: white;
`;
const AddIcon = styled(PlusSquare)`
  width: 20px;
  fill: white;
`;
const CloseIcon = styled(CloseOutline)`
  width: 30px;
  fill: white;
`;

export const Install: React.FC<IProps> = ({ close }) => {
  return (
    <InstallBlock>
      <AppIcon src={WLIcon} />
      <InstallTextBlock>
        <InstallText>Установите приложение на&nbsp;свое устройство:</InstallText>
        <InstallText>
          нажмите&nbsp;
          <ShareIcon />
          , а&nbsp;затем&nbsp;
          <AddIcon />
        </InstallText>
      </InstallTextBlock>
      <CloseIcon onClick={close} />
    </InstallBlock>
  );
};
