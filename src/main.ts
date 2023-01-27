import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import * as Passport from 'passport';
import * as pgSimple from 'connect-pg-simple';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  app.get(AppService).subscribeToShutdown(() => app.close());

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  const pgSession = pgSimple(session);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 2,
      },
      store: new pgSession({
        conString: process.env.DB_CONN_STRING,
        createTableIfMissing: true,
      }),
    }),
  );

  app.use(Passport.initialize());
  app.use(Passport.session());
  await app.listen(4242);
}
bootstrap();
