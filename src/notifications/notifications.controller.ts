import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { CreateNotificationDTO } from './dto/createNotification.dto';
import { NotificationsService } from './notifications.service';
import { Roles } from '../users/guards/roles.decorator';
import { RequestType } from '../types';

@UseGuards(AuthenticatedGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  getNotifications(@Req() req: RequestType) {
    return this.notificationsService.getNotifications(req.user.id);
  }

  @Roles('admin')
  @Post('/')
  createNotification(
    @Body() data: CreateNotificationDTO,
    @Req() req: RequestType,
  ) {
    data.isGlobal = true;
    return this.notificationsService.createNotification(data, req.user.id);
  }

  @Roles('admin', 'secretaria')
  @Post('/:matricula')
  createNotificationToUser(
    @Body() data: CreateNotificationDTO,
    @Param('matricula') matricula: string,
    @Req() req: RequestType,
  ) {
    return this.notificationsService.createNotification(
      data,
      req.user.id,
      matricula,
    );
  }

  @Roles('admin', 'secretaria')
  @Put('/:id')
  updateNotification(@Param('id') id: number, @Req() req: RequestType) {
    return this.notificationsService.addressNotification(id, req.user.id);
  }
}
