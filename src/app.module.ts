import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
