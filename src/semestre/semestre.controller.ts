import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { Roles } from '../users/guards/roles.decorator';
import { SemestreService } from './semestre.service';

@UseGuards(AuthenticatedGuard)
@Roles('admin')
@Controller('semestre')
export class SemestreController {
  constructor(private readonly semestreService: SemestreService) {}

  @Get()
  async getSemestreStatus() {
    return await this.semestreService.getSemestreStatus();
  }

  @Post('startSemestre')
  async startSemestre() {
    return await this.semestreService.startSemestre();
  }

  @Post('/endSemestre')
  async endSemestre() {
    return await this.semestreService.endSemestre();
  }
}
