import {
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
import { UpdateSettingDto } from './dto/updateSetting.dto';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';

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
    @Body() { value }: UpdateSettingDto,
  ) {
    return await this.settingsService.updateSetting(key, value);
  }
}
