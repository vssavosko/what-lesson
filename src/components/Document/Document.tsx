import React from 'react';

import styled from 'styled-components';
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline';

import { ITheme } from '../../globalInterfaces';
import { IProps } from './interfaces';

import { nameFormatting } from '../../utils/nameFormatting';

import { ReactComponent as Document } from '../../assets/images/svg/document-icon.svg';

const DocumentBlock = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 90px;
  background-color: ${(props: ITheme): string => props.theme.elementBackground};
  padding: 15px;
  border: 1px solid ${(props: ITheme): string => props.theme.borderColor};
  border-radius: 10px;
  margin-bottom: 16px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
`;
const DocumentLink = styled.a`
  display: flex;
  width: 100%;
  height: 100%;
  text-decoration: none;
`;
const DocumentIcon = styled(Document)`
  width: 60px;
  height: 100%;

  & path,
  line {
    stroke: ${(props: ITheme): string => props.theme.elementsColor};
  }
`;
const DocumentTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 0 16px;
  word-break: break-word;
`;
const DocumentName = styled.p`
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 16px;
  color: ${(props: ITheme): string => props.theme.mainTextColor};
  margin-bottom: 7px;
`;
const DocumentDetailInfo = styled.p`
  font-family: 'SFProTextRegular', sans-serif;
  font-size: 12px;
  color: ${(props: ITheme): string => props.theme.secondTextColor};
`;
const DocumentDeleteButton = styled.button`
  width: 30px;
  background: none;
  padding: 0;
  border: none;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:active svg {
    fill: ${(props: ITheme): string => props.theme.elementsColor};
  }

  @media (min-width: 770px) {
    &:hover svg {
      fill: ${(props: ITheme): string => props.theme.elementsColor};
    }
  }
`;
const CloseIcon = styled(CloseOutline)`
  width: 30px;
  fill: ${(props: ITheme): string => props.theme.secondTextColor};
  transition: 0.2s;
`;

export const DocumentItem: React.FC<IProps> = ({
  host,
  userName,
  userGroup,
  documentInfo,
  updateDocumentsState,
}) => {
  const deleteDocument = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const target = event.currentTarget;
    const payload = {
      filename: target.dataset.name,
      ext: target.dataset.ext,
      userGroup,
    };

    fetch(`${host}/deleteDocument`, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then(() => updateDocumentsState(target.dataset.name || ''))
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <>
      {documentInfo.name.length ? (
        <DocumentBlock>
          <DocumentLink href={documentInfo.path}>
            <DocumentIcon />
            <DocumentTextBlock>
              <DocumentName>{nameFormatting(documentInfo.name, 35)}</DocumentName>
              <DocumentDetailInfo>
                {documentInfo.ext.toUpperCase()}&nbsp;&#183;&nbsp;{documentInfo.sendingDate}
                &nbsp;&#183;&nbsp;
                {documentInfo.size}
              </DocumentDetailInfo>
            </DocumentTextBlock>
          </DocumentLink>
          {userName === documentInfo.userName && (
            <DocumentDeleteButton
              type="button"
              aria-label="Delete"
              data-name={documentInfo.name}
              data-ext={documentInfo.ext}
              onClick={(event): void => deleteDocument(event)}
            >
              <CloseIcon />
            </DocumentDeleteButton>
          )}
        </DocumentBlock>
      ) : (
        false
      )}
    </>
  );
};
