import { EntityManager } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateNotificationDTO } from './dto/createNotification.dto';
import { User } from 'src/models/user';
import { Notification } from 'src/models/notification';
import { ActivityHistoryService } from 'src/activity-history/activity-history.service';
import { NOTIFICATION_OPERATIONS_MESSAGES } from 'src/constants';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly em: EntityManager,
    private readonly activityHistoryService: ActivityHistoryService,
  ) {}

  private readonly logger = new Logger(NotificationsService.name);

  async createNotification(
    data: CreateNotificationDTO,
    adminId: number,
    matriculaUser?: string,
  ) {
    try {
      const notification = this.em.fork().create(Notification, data);

      if (matriculaUser) {
        const user = await this.em
          .fork()
          .findOneOrFail(
            User,
            { matricula: matriculaUser },
            { populate: ['notifications'] },
          );

        user.notifications.add(notification);

        await this.em.fork().persistAndFlush(user);

        return {
          message: `La notificaión se asignó correctamente al usuario ${user.matricula}`,
        };
      }

      await this.em.fork().persistAndFlush(notification);

      await this.activityHistoryService.createActivityHistory({
        action: 'create',
        description: NOTIFICATION_OPERATIONS_MESSAGES.create,
        updatedBy: adminId,
      });

      return {
        message: 'La notificaión se creó correctamente',
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Error al crear la notificación');
    }
  }

  async getNotifications(userId: number) {
    try {
      const notifications = await this.em.fork().find(Notification, {
        $or: [{ user: userId }, { isGlobal: true }],
      });

      return notifications;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Error al obtener las notificaciones');
    }
  }

  async isUserExpedienteEnabled(userId: number) {
    try {
      const user = await this.em.fork().find(Notification, {
        $or: [{ user: userId }, { isGlobal: true }],
        required: true,
        addressed: false,
      });

      return user.length > 0;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Error al obtener las notificaciones');
    }
  }

  async addressNotification(id: number) {
    try {
      const notification = await this.em.fork().findOneOrFail(
        Notification,
        {
          id,
        },
        { populate: ['user'] },
      );

      notification.addressed = true;

      await this.em.fork().persistAndFlush(notification);

      await this.activityHistoryService.createActivityHistory({
        action: 'update',
        description: NOTIFICATION_OPERATIONS_MESSAGES.address,
        updatedBy: notification.user.id,
        userAffected: notification.user.id,
      });

      return {
        message: 'La notificaión se actualizó correctamente',
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Error al actualizar la notificación');
    }
  }
}
