import { EntityManager } from '@mikro-orm/postgresql';
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { Configs } from 'src/models/configs';
import {
  CONFIG_APPS_CONSTANTS,
  ERROR_MESSAGES,
  SEMESTER_STATUS,
} from 'src/constants';

@Injectable()
export class SemestreService {
  constructor(private readonly em: EntityManager) {}

  private readonly logger = new Logger(SemestreService.name);

  async getSemestreStatus() {
    const status = await this.em
      .fork()
      .findOne(Configs, { name: CONFIG_APPS_CONSTANTS.semestreStatus });

    if (!status) {
      this.logger.error(
        'The semestre variable info is not set, please set the information to be able to use this feature.',
      );
      throw new BadGatewayException(ERROR_MESSAGES.ERROR_ACCESING_APAP_INFO);
    }
    return status.value;
  }

  async startSemestre() {
    const status = await this.em
      .fork()
      .findOne(Configs, { name: CONFIG_APPS_CONSTANTS.semestreStatus });

    status.value = SEMESTER_STATUS.OPEN;
    await this.em.fork().persistAndFlush(status);

    return { status: 'Semestre started' };
  }

  async endSemestre() {
    const status = await this.em
      .fork()
      .findOne(Configs, { name: CONFIG_APPS_CONSTANTS.semestreStatus });
    status.value = SEMESTER_STATUS.CLOSED;
    await this.em.fork().persistAndFlush(status);

    //TODO: add logic to end semestre (close all classes, etc)

    return { status: 'Semestre ended' };
  }
}
