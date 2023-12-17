import { EntityManager } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import PDFKit from 'pdfkit';
import { User } from 'src/models/user';
import {
  UserFichaPagoParams,
  generateContent,
  generateHeader,
  isPrepaUJED,
} from './reportes.utils';
import {
  convertCurrencyToLetter,
  generateFolio,
  getCurrentPeriod,
} from './reportes.utils';
import { Configs } from 'src/models/configs';
import { CONFIG_APPS_CONSTANTS, ERROR_MESSAGES } from 'src/constants';

@Injectable()
export class ReportesService {
  constructor(private readonly em: EntityManager) {}

  async getFichaPago(id: number) {
    try {
      const document = new PDFKit();

      generateHeader(document);

      const user = await this.em.findOne(User, { id: id });

      if (!user) {
        throw new NotFoundException(ERROR_MESSAGES.CANTGENERATEFICHA);
      }

      const numConsecutivo = await this.em.findOne(Configs, {
        name: CONFIG_APPS_CONSTANTS.consecutivoFollio,
      });

      if (!numConsecutivo) {
        throw new InternalServerErrorException(
          ERROR_MESSAGES.CANTGENERATEFICHA,
          {
            cause: 'El numero consecutivo no existe en la base de datos',
          },
        );
      }

      const nombreBanco = await this.em.findOne(Configs, {
        name: CONFIG_APPS_CONSTANTS.nombreBanco,
      });

      const noCuenta = await this.em.findOne(Configs, {
        name: CONFIG_APPS_CONSTANTS.cuentabancaria,
      });

      const clabe = await this.em.findOne(Configs, {
        name: CONFIG_APPS_CONSTANTS.clabe,
      });

      if (!nombreBanco || !noCuenta || !clabe) {
        throw new InternalServerErrorException(
          ERROR_MESSAGES.CANTGENERATEFICHA,
          {
            cause: 'Datos bancarios faltantes',
          },
        );
      }

      const folio = generateFolio(Number(numConsecutivo.value));

      const cuota = await this.em.findOne(Configs, {
        name: isPrepaUJED(user.escuelaProcedencia)
          ? CONFIG_APPS_CONSTANTS.cuotaPreferencial
          : CONFIG_APPS_CONSTANTS.cuotaGeneral,
      });

      if (!cuota) {
        throw new InternalServerErrorException(
          ERROR_MESSAGES.CANTGENERATEFICHA,
          {
            cause: 'No existe la cuota del usuario',
          },
        );
      }

      const reportCotntent: UserFichaPagoParams = {
        matricula: user.matricula,
        nombres: user.nombre,
        apellidoPaterno: user.apellidoPaterno,
        apellidoMaterno: user.apellidoMaterno,
        semestre: getCurrentPeriod(),
        total: Number(cuota.value).toFixed(2),
        datosBancarios: {
          nombre: nombreBanco.value,
          noCuenta: noCuenta.value,
          clabe: noCuenta.value,
        },

        conceptoPago: `Admisión ${getCurrentPeriod()} ${folio}`,
        totalLetra: convertCurrencyToLetter(Number(cuota.value)),
        folio,
      };

      generateContent(document, reportCotntent);

      document.end();

      return {
        document: document,
        message: 'Ficha de pago generada correctamente',
      };
    } catch (error) {
      console.error(error);

      if (
        !(error instanceof NotFoundException) &&
        !(error instanceof InternalServerErrorException)
      )
        throw new BadRequestException('No se pudo generar la ficha de pago');
      else throw error;
    }
  }
}
