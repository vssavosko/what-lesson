import React, { useState, useRef, useEffect } from 'react';

import styled from 'styled-components';
import { PlusOutline } from '@styled-icons/evaicons-outline';

import { Loader } from '../Loader/Loader';
import { DocumentItem } from '../Document/Document';

import { DocumentType } from '../../globalTypes';
import { ITheme } from '../../globalInterfaces';
import { IProps } from './interfaces';

const Page = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  background-color: ${(props: ITheme): string => props.theme.background};
`;
const DocumentsWindow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: ${(props: { positioning: string }): string => props.positioning};
  align-items: ${(props: { positioning: string }): string => props.positioning};
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 1000px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const DocumentsList = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  padding: 16px;
`;
const ErrorMessage = styled.p`
  width: 100%;
  font-family: 'SFProTextRegular', sans-serif;
  color: ${(props: ITheme): string => props.theme.mainTextColor};
  text-align: center;
`;
const AddDocumentBlock = styled.div`
  box-sizing: border-box;
  position: fixed;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 1200px;
  bottom: 61px;
  padding-right: 16px;
`;
const AddDocumentButton = styled.button`
  position: relative;
  width: 50px;
  height: 50px;
  background: ${(props: ITheme): string => props.theme.elementBackground};
  padding: 0;
  border: 1px solid ${(props: ITheme): string => props.theme.borderColor};
  border-radius: 50%;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  transition: 0.2s;
  cursor: pointer;

  &:active svg {
    fill: ${(props: ITheme): string => props.theme.secondTextColor};
  }

  @media (min-width: 770px) {
    &:hover svg {
      fill: ${(props: ITheme): string => props.theme.secondTextColor};
    }
  }
`;
const PlusIcon = styled(PlusOutline)`
  display: block;
  width: 30px;
  height: 100%;
  fill: ${(props: ITheme): string => props.theme.elementsColor};
  margin: auto;
  transition: 0.2s;
`;
const UploadDocument = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  visibility: hidden;
`;

export const Documents: React.FC<IProps> = ({ host, userRegistrationData }) => {
  const [documents, setDocuments] = useState<DocumentType[]>([
    {
      name: '',
      ext: '',
      path: '',
      sendingDate: '',
      size: '',
    },
  ]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const refUploadDocuments = useRef<HTMLInputElement>(null);

  const clickUploadDocument = (): void => refUploadDocuments.current?.click();

  const uploadDocument = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist();

    const { files } = event.target;

    if (files?.length) {
      const formData = new FormData();
      const date = new Date();
      const options = {
        day: 'numeric',
        month: 'long',
      };

      formData.append(
        'upload-document',
        files[0],
        `${files[0].name}~~${userRegistrationData.groupCode}~~${
          host.name.split('//')[1]
        }~~${date.toLocaleDateString('ru', options)}`,
      );

      fetch(`${host.api}/uploadDocument`, {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.upload) setDocuments([res.file, ...documents]);
          if (res.upload && documents.length + 1 === 2) {
            setError('');
          }
        })
        .catch((error) => {
          throw new Error(error);
        })
        .finally(() => {
          event.target.value = '';
        });
    }
  };

  const updateDocumentsState = (name: string): void => {
    const newDocuments = documents.filter((document) => document.name !== name);

    setDocuments(newDocuments);

    if (newDocuments.length === 1) {
      setError('Документы не найдены');
    }
  };

  useEffect(() => {
    fetch(`${host.api}/getDocuments`, {
      method: 'POST',
      body: JSON.stringify({ userGroup: userRegistrationData.groupCode }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.error) {
          setError(res.error);

          return;
        }

        const documentsOfGroup = Object.values(res) as DocumentType[];

        setDocuments(documentsOfGroup.reverse());
      })
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [host, userRegistrationData]);

  return (
    <Page>
      <DocumentsWindow positioning={isLoading || error.length ? 'center' : ''}>
        {isLoading && !error.length && <Loader />}
        {!isLoading && !error.length && (
          <DocumentsList>
            {documents.map((document: DocumentType, index: number) => (
              <DocumentItem
                key={index}
                host={host.api}
                userGroup={userRegistrationData.groupCode}
                documentInfo={document}
                updateDocumentsState={updateDocumentsState}
              />
            ))}
          </DocumentsList>
        )}
        {!!error.length && <ErrorMessage>{error} &#x1F628;</ErrorMessage>}
        <AddDocumentBlock>
          <AddDocumentButton onClick={clickUploadDocument}>
            <PlusIcon />
            <UploadDocument
              type="file"
              name="upload-document"
              onChange={(event): void => uploadDocument(event)}
              ref={refUploadDocuments}
            />
          </AddDocumentButton>
        </AddDocumentBlock>
      </DocumentsWindow>
    </Page>
  );
};
