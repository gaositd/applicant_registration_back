import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ActivityHistory, OPERATIONS_TYPE } from 'src/models/activity_history';
import { User } from 'src/models/user';

type ActivityHistoryType = {
  description?: string;
  action: OPERATIONS_TYPE;
  userAffected: number;
  updatedBy: number;
};

@Injectable()
export class ActivityHistoryService {
  constructor(private readonly em: EntityManager) {}

  async createActivityHistory({
    description,
    action,
    userAffected,
    updatedBy,
  }: ActivityHistoryType) {
    try {
      const activityHistory = this.em.create(ActivityHistory, {
        description,
        action,
        userAffected,
        updatedBy,
      });

      const admin = await this.em.findOne(
        User,
        { id: updatedBy },
        { populate: ['activityHistory'] },
      );

      admin.activityHistory.add(activityHistory);

      await this.em.persistAndFlush(admin);

      return {
        ok: true,
        activityHistory,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async getActivityHistory({
    prospectoId,
    adminId,
  }: {
    prospectoId?: number;
    adminId?: number;
  }) {
    try {
      const activityHistory = prospectoId
        ? await this.em.find(ActivityHistory, {
            userAffected: prospectoId,
          })
        : await this.em.find(ActivityHistory, {
            updatedBy: adminId,
          });
      return {
        ok: true,
        activityHistory,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
