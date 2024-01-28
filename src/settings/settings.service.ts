import { EntityManager } from '@mikro-orm/postgresql';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CONFIG_TYPE, Configs } from '../models/configs';
import { CreateSettingDto } from './dto/createSetting.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly em: EntityManager) {}

  async getSettings(type?: CONFIG_TYPE) {
    const options = type ? { configType: type } : {};
    return this.em.find(Configs, options);
  }

  async getSetting(key: string) {
    return this.em.findOne(Configs, { name: key });
  }

  async createSetting(settingData: CreateSettingDto) {
    try {
      const setting = this.em.fork().create(Configs, settingData);
      await this.em.persistAndFlush(setting);
      return {
        message: 'Configuración creada con éxito',
        data: setting,
      };
    } catch (error) {
      console.log(error);

      if (error.code === '23505')
        throw new BadRequestException(
          'Ya existe esa configuración, intente con otro nombre',
        );
      else throw new BadRequestException('No se pudo crear la configuración');
    }
  }

  async updateSetting(key: string, value: string) {
    const setting = await this.em.findOne(Configs, { name: key });
    if (!setting) {
      throw new NotFoundException('Setting not found');
    }
    setting.value = value;
    await this.em.persistAndFlush(setting);
    return {
      message: 'Configuración actualizada con éxito',
      data: setting,
    };
  }
}
