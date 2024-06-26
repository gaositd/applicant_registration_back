import { EntityManager } from '@mikro-orm/postgresql';
import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { Configs } from '../models/configs';
import {
  CONFIG_APPS_CONSTANTS,
  ERROR_MESSAGES,
  SEMESTER_STATUS,
} from '../constants';
import { USER_STATUS, User } from '../models/user';
import { FileStatus, UserDocuments } from '../models/user_documents';

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
      throw new BadGatewayException(ERROR_MESSAGES.ERROR_ACCESING_APP_INFO);
    }
    return status.value;
  }

  async startSemestre() {
    const status = await this.em
      .fork()
      .findOne(Configs, { name: CONFIG_APPS_CONSTANTS.semestreStatus });

    status.value = SEMESTER_STATUS.OPEN;

    const appConfigs = await this.em
      .fork()
      .find(Configs, { name: { $in: Object.values(CONFIG_APPS_CONSTANTS) } });

    if (appConfigs.length !== Object.values(CONFIG_APPS_CONSTANTS).length) {
      this.logger.error(
        'The semestre variable info is not set, please set the information to be able to use this feature.',
      );
      throw new BadGatewayException(ERROR_MESSAGES.ERROR_STARTING_SEMESTER);
    }

    await this.em.fork().persistAndFlush(status);

    return { status: 'Semestre started' };
  }

  async endSemestre() {
    try {
      const status = await this.em
        .fork()
        .findOne(Configs, { name: CONFIG_APPS_CONSTANTS.semestreStatus });
      status.value = SEMESTER_STATUS.CLOSED;
      await this.em.fork().persistAndFlush(status);

      const queryBuilder = this.em.qb(User);

      queryBuilder
        .update({
          status: USER_STATUS.DUEUED,
        })
        .where({
          status: USER_STATUS.PENDING,
        });

      await queryBuilder.execute();

      const qb = await this.em.qb(UserDocuments);

      qb.update({
        status: FileStatus.REJECTED,
      }).where({
        $or: [
          { status: FileStatus.REVIEWING },
          { status: FileStatus.OPENTOUPLUAD },
        ],
      });

      await qb.execute();

      return { status: 'Semestre ended' };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
