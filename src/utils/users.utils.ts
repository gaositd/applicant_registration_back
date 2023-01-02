import { DOCUMENT_TYPE } from './types';

export const getCurrentPeriod = () => {
  const currDate = new Date();
  if (currDate.getMonth() >= 1 && currDate.getMonth() <= 7)
    return `Enero-Junio-${currDate.getFullYear()}`;

  return `Agosto-Diciembre-${currDate.getFullYear()}`;
};

export const getFileName = (
  documento: typeof DOCUMENT_TYPE,
  fileName: string,
) => {
  const ext = fileName.split('.').pop();

  return `${documento}.${ext}`;
};
