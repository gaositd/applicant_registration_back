import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../models/user';
import { hash } from 'bcrypt';
import { createMatricula } from '../users/utils';

export class AdminSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const hashedPassword = await hash(
      'admin',
      parseInt(process.env.HASH_SALT_ROUNDS),
    );

    const matricula = 'DCM3ZAIFjYF3';

    const admin = em.create(User, {
      nombre: 'Admin',
      mail: 'admin@admin.com',
      password: hashedPassword,
      role: 'admin',
      matricula,
    });

    await em.persistAndFlush(admin);
  }
}
