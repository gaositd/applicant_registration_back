import { Module } from '@nestjs/common';
import { SemestreController } from './semestre.controller';
import { SemestreService } from './semestre.service';

@Module({
  controllers: [SemestreController],
  providers: [SemestreService],
  exports: [SemestreService],
})
export class SemestreModule {}
