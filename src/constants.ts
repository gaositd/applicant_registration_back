export const DOCUMENTS_OPERATIONS_MESSAGES = {
  approve: 'El documento ha sido aprobado',
  reject: 'El documento ha sido rechazado',
  reviewing: 'El documento ha sido enviado a revisión',
  'open-to-upload': 'El documento ha sido abierto para subir',
  upload: 'El documento ha sido subido',
};

export const USER_OPERATIONS_MESSAGES = {
  'create-admin': 'Se ha creado un nuevo administrador o secretaria',
  create: 'Se ha creado un nuevo prospecto',
  update: 'Se ha actualizado un usuario',
  delete: 'Se ha eliminado un usuario',
};

export const NOTIFICATION_OPERATIONS_MESSAGES = {
  create: 'Se ha creado una nueva notificación',
  address: 'Se ha atendido una notificación',
};

export const API_RESPONSE_MESSAGES = {
  pendingNotification:
    'El expediente del usuario tiene notificaciones pendientes',
  SEMESTER_CLOSED:
    'El semestre se encuentra cerrado, no se pueden subir archivos',
};

export const CONFIG_APPS_CONSTANTS = {
  consecutivoFollio: 'folio-consecutivo',
  cuentabancaria: 'bank-numero-cuenta',
  clabe: 'bank-clabe',
  nombreBanco: 'bank-name',
  cuotaPreferencial: 'cuota-escuela-interna',
  cuotaGeneral: 'cuota-escuela-general',
  semestreStatus: 'semestre-status',
};

export const ERROR_MESSAGES = {
  CANTGENERATEFICHA:
    'No se ha podido generar la ficha, intentalo de nuevo o ponte en contacto con el administador.',
  ERROR_ACCESING_APAP_INFO:
    'No se ha podido acceder a la información, intentalo de nuevo o ponte en contacto con el administador.',
};

export const PREPAS_UJED = ['Nocturna', 'Diurna', 'CCH'];

export const SEMESTER_STATUS = {
  OPEN: 'abierto',
  CLOSED: 'cerrado',
};
