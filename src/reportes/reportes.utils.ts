import path from 'path';
import { PREPAS_UJED } from '../constants';

export function generateHeader(pdfDoc: PDFKit.PDFDocument) {
  pdfDoc
    .image(
      path.join(__dirname, '..', '..', '/assets', 'logoIzquierdo.png'),
      50,
      45,
      {
        width: 50,
      },
    )
    .text('Ficha de Registro', 110, 37, { align: 'center' })
    .text('Examen de Admision', 110, 50, { align: 'center' })
    .text('Licenciatura en Matemáticas', 110, 73, { align: 'center' })
    .text('Facultad de Ciencias Exactas de la ', 110, 86, { align: 'center' })
    .text('Universidad Juárez del Estado de Durango', 110, 99, {
      align: 'center',
    })
    .image(
      path.join(__dirname, '..', '..', '/assets', 'logoDerecho.jpg'),
      500,
      45,
      {
        width: 100,
        height: 80,
        align: 'right',
      },
    )
    .lineGap(10)
    .moveDown();
}

export type UserFichaPagoParams = {
  matricula: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  semestre: string;
  total: string;
  datosBancarios: TDatosBancarios;
  conceptoPago: string;
  totalLetra: string;
  folio: string;
};

type TDatosBancarios = {
  nombre: string;
  noCuenta: string;
  clabe: string;
};

export function generateContent(
  pdfDoc: PDFKit.PDFDocument,
  fichaInfo: UserFichaPagoParams,
) {
  pdfDoc
    .fontSize(12)
    .text(`Semestre ${fichaInfo.semestre}`, 50, 160, { align: 'left' })
    .moveDown()
    .text(`Folio ${fichaInfo.folio}`, 50, 190, { align: 'left' })
    .moveDown()
    .text(`Apellido Paterno: ${fichaInfo.apellidoPaterno}`, 50, 205, {
      align: 'left',
    })
    .moveDown()
    .text(`Apellido Materno: ${fichaInfo.apellidoMaterno}`, 50, 220, {
      align: 'left',
    })
    .moveDown()
    .text(`Nombre(s): ${fichaInfo.nombres}`, 50, 235)
    .moveDown();

  pdfDoc
    .font('Helvetica-Bold')
    .text('Datos bancarios para el deposito', 50, 260);

  pdfDoc

    .text(`Nombre del banco: ${fichaInfo.datosBancarios.nombre}`, 50, 285)
    .text(`No. de cuenta: ${fichaInfo.datosBancarios.noCuenta}`, 50, 300)
    .text(`CLABE: ${fichaInfo.datosBancarios.clabe}`, 50, 315)
    .moveDown();

  pdfDoc.moveDown();

  //conepto de pago
  pdfDoc
    .font('Helvetica')
    .text(`En el concepto de pago poner: `, 50, 355)
    .font('Helvetica-Bold')
    .text(`${fichaInfo.conceptoPago}`, 215, 355)
    .font('Helvetica')
    .text(
      `La cantidad a pagar es de \$${fichaInfo.total} (${fichaInfo.totalLetra})`,
      50,
      390,
    );
}

export const getCurrentPeriod = () => {
  const currDate = new Date();
  if (currDate.getMonth() >= 0 && currDate.getMonth() <= 7)
    return `A-${currDate.getFullYear()}`;
  return `B-${currDate.getFullYear()}`;
};

const formatNmberToThreeDigits = (number: number) => {
  if (number < 10) return `00${number}`;
  if (number < 100) return `0${number}`;
  return `${number}`;
};

export const generateFolio = (consecutivo: number) => {
  const currDate = new Date();
  const year = currDate.getFullYear();

  //get current period (1 or 2)
  const period = getCurrentPeriod().split('-')[0] === 'A' ? '1' : '2';

  const folio = `${year}${period}${formatNmberToThreeDigits(consecutivo)}`;

  return folio;
};

export const convertCurrencyToLetter = (numero: number) => {
  const units = [
    '',
    'UN ',
    'DOS ',
    'TRES ',
    'CUATRO ',
    'CINCO ',
    'SEIS ',
    'SIETE ',
    'OCHO ',
    'NUEVE ',
    'DIEZ ',
    'ONCE ',
    'DOCE ',
    'TRECE ',
    'CATORCE ',
    'QUINCE ',
    'DIECISEIS ',
    'DIECISIETE ',
    'DIECIOCHO ',
    'DIECINUEVE ',
    'VEINTE ',
  ];
  const tens = [
    '',
    '',
    'VEINTI',
    'TREINTA ',
    'CUARENTA ',
    'CINCUENTA ',
    'SESENTA ',
    'SETENTA ',
    'OCHENTA ',
    'NOVENTA ',
    'CIEN ',
  ];

  const decenasPara10 = [
    '',
    'ONCE ',
    'DOCE ',
    'TRECE ',
    'CATORCE ',
    'QUINCE ',
    'DIECISEIS ',
    'DIECISIETE ',
    'DIECIOCHO ',
    'DIECINUEVE ',
  ];

  const hundreds = [
    '',
    'CIENTO ',
    'DOSCIENTOS ',
    'TRESCIENTOS ',
    'CUATROCIENTOS ',
    'QUINIENTOS ',
    'SEISCIENTOS ',
    'SETECIENTOS ',
    'OCHOCIENTOS ',
    'NOVECIENTOS ',
  ];

  let output = '';

  let centavos = Math.round((numero % 1) * 100);
  numero = Math.floor(numero); // Redondea hacia abajo para eliminar los centavos

  let unidades = numero % 10;
  numero = Math.floor(numero / 10);

  let decenas = numero % 10;
  numero = Math.floor(numero / 10);

  let centenas = numero % 10;
  numero = Math.floor(numero / 10);

  let millares = numero % 10;
  numero = Math.floor(numero / 10);

  //Concat millares
  if (millares > 0) {
    if (millares === 1) {
      output += 'MIL ';
    } else {
      output += `${units[millares]}MIL `;
    }
  }

  if (centenas > 0) {
    if (centenas === 1 && decenas === 0 && unidades === 0) {
      output += 'CIEN ';
    } else {
      output += hundreds[centenas];
    }
  }

  if (decenas > 0 || unidades > 0) {
    if (decenas === 0) {
      output += units[unidades];
    } else if (decenas === 1) {
      output += decenasPara10[unidades];
    } else if (decenas === 2) {
      output += tens[decenas] + units[unidades];
    } else {
      output += tens[decenas] + 'Y ' + units[unidades];
    }
  }

  output += 'PESOS ';

  if (centavos > 0) {
    output += `${centavos}/100 M.N.`;
  } else {
    output += '0/100 M.N.';
  }

  return output;
};

export const isPrepaUJED = (prepa: string) => PREPAS_UJED.includes(prepa);
