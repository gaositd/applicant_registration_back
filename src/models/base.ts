import { PrimaryKey, Property } from '@mikro-orm/core';

export class BaseModel {
  @PrimaryKey()
  id: number;

  @Property({ type: 'date', default: 'NOW()' })
  createdAt = new Date();

  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();
}
