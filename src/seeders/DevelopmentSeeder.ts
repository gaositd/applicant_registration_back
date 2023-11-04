import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../models/user';
import { hash } from 'bcrypt';

export class DevelopmentSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const hashedPassword = await hash(
      'admin',
      parseInt(process.env.HASH_SALT_ROUNDS),
    );

    const matricula = 'DCM3ZAIFjYF3';

    const admin = em.create(User, {
      nombre: 'Admin Jonathan',
      mail: 'admin@admin.com',
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
      mail: 'secretaria@secretaria.com',
      password: hashedPasswordSecretaria,
      role: 'secretaria',
      matricula: 'YgvInAxNrBDg',
    });

    await em.persistAndFlush([admin, secretaria]);
  }
}
