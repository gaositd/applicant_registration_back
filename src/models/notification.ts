import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { BaseModel } from './base';
import { User } from './user';

export enum ENotificationType {
  'system' = 'system',
  'text' = 'text',
  'resource' = 'resource',
  'requirement' = 'requirement',
}

export type TNotificationType = keyof typeof ENotificationType;

@Entity()
export class Notification extends BaseModel {
  @Enum({ items: () => ENotificationType, default: ENotificationType.system })
  type: TNotificationType;

  @Property()
  data: string;

  @Property({ type: 'boolean', default: false })
  required: boolean;

  @Property({ type: 'boolean', default: false, nullable: true })
  addressed: boolean;

  @Property({ type: 'boolean', default: false, nullable: true })
  isGlobal: boolean;

  @ManyToOne(() => User, { nullable: true })
  user: User;
}
