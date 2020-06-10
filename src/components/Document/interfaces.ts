import { DocumentType } from '../../globalTypes';

export interface IProps {
  host: string;
  userName: string;
  userGroup: string;
  documentInfo: DocumentType;
  updateDocumentsState: (name: string) => void;
}
