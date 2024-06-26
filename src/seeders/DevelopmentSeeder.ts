import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../models/user';
import { hash } from 'bcrypt';
import { CONFIG, Configs } from '../models/configs';
import { CONFIG_APPS_CONSTANTS, SEMESTER_STATUS } from '../constants';

export class DevelopmentSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const hashedPassword = await hash(
      'admin',
      parseInt(process.env.HASH_SALT_ROUNDS),
    );

    const matricula = 'DCM3ZAIFjYF3';

    const admin = em.create(User, {
      nombre: 'Admin Jonathan',
      apellidoMaterno: 'AMaterno',
      apellidoPaterno: 'APaterno',
      fechaNacimiento: new Date('1999-01-01'),
      celular: '1234567890',
      email: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin',
      matricula,
    });

    const hashedPasswordSecretaria = await hash(
      'secretaria',
      parseInt(process.env.HASH_SALT_ROUNDS),
    );

    const secretaria = em.create(User, {
      nombre: 'Secretaria Jonathan',
      apellidoMaterno: 'AMaterno',
      apellidoPaterno: 'APaterno ',
      fechaNacimiento: new Date('1999-01-01'),
      celular: '1234567890',
      email: 'secretaria@secretaria.com',
      password: hashedPasswordSecretaria,
      role: 'secretaria',
      matricula: 'YgvInAxNrBDg',
    });

    const Setting = em.create(Configs, {
      name: CONFIG_APPS_CONSTANTS.semestreStatus,
      value: SEMESTER_STATUS.OPEN,
      configType: CONFIG.APP_CONFIG,
    });

    await em.persistAndFlush([admin, secretaria, Setting]);
  }
}
