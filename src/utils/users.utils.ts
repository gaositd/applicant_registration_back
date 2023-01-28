import { FileTypeInterface } from 'src/models/user_documents';

export const getCurrentPeriod = () => {
  const currDate = new Date();
  if (currDate.getMonth() >= 0 && currDate.getMonth() <= 7)
    return `Enero-Junio-${currDate.getFullYear()}`;

  return `Agosto-Diciembre-${currDate.getFullYear()}`;
};

export const getFileName = (documento: FileTypeInterface, fileName: string) => {
  const ext = fileName.split('.').pop();

  return `${documento}.${ext}`;
};
