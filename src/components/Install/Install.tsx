import React, { useContext } from 'react';

import styled from 'styled-components';
import { ShareAlternative } from '@styled-icons/entypo/ShareAlternative';
import { PlusSquare } from '@styled-icons/evaicons-solid/PlusSquare';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';

import { Context } from '../../containers/app/appContext';

import WLIcon from '../../assets/images/app-icon.png';

const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0 5px;
  z-index: 10;
`;
const InstallBlock = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 15px 0;
  border-radius: 10px;
  margin: 5px 0;
  backdrop-filter: blur(4px);
  transition: 0.2s;
`;
const AppIcon = styled.img`
  width: 60px;
  max-width: 100%;
  padding: 0 10px;
`;
const InstallTextBlock = styled.div`
  width: 100%;
  line-height: 1.5;
  padding-right: 10px;
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
  padding-right: 10px;
  cursor: pointer;
`;

export const Install: React.FC = () => {
  const { dispatch } = useContext(Context);

  const close = (): void => dispatch({ type: 'isInstall', payload: false });

  return (
    <Wrapper>
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
    </Wrapper>
  );
};
