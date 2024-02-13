import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CONFIG_TYPE } from 'src/models/configs';
import { CreateSettingDto } from './dto/createSetting.dto';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';

@UseGuards(AuthenticatedGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('/')
  async getSettings(@Query('type') type?: CONFIG_TYPE) {
    return await this.settingsService.getSettings(type);
  }

  @Get('/:key')
  async getSetting(@Param('key') key: string) {
    return await this.settingsService.getSetting(key);
  }

  @Post('/')
  async createSetting(@Body() settingData: CreateSettingDto) {
    return await this.settingsService.createSetting(settingData);
  }

  @Put('/:key')
  async updateSetting(
    @Param('key') key: string,
    @Query('value') value: string,
  ) {
    if(!value) throw new BadRequestException('Value is required');
    return await this.settingsService.updateSetting(key, value);
  }
}
