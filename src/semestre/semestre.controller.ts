import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SemestreService } from './semestre.service';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { Roles } from 'src/users/guards/roles.decorator';

@UseGuards(AuthenticatedGuard)
@Roles('admin')
@Controller('semestre')
export class SemestreController {
  constructor(private readonly semestreService: SemestreService) {}

  @Get()
  async getSemestreStatus() {
    return await this.semestreService.getSemestreStatus();
  }

  @Post()
  async startSemestre() {
    return await this.semestreService.startSemestre();
  }

  @Post('/end')
  async endSemestre() {
    return await this.semestreService.endSemestre();
  }
}
