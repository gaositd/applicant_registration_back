import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { AppModule } from './app.module';
import Passport from 'passport';
import pgSimple from 'connect-pg-simple';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(morgan('dev'));

  const pgSession = pgSimple(session);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 2,
        secure: false,
      },
      store: new pgSession({
        conString: process.env.DB_CONN_STRING,
        createTableIfMissing: true,
      }),
    }),
  );

  app.use(Passport.initialize());
  app.use(Passport.session());
  await app.listen(process.env.PORT || 4242);
}
bootstrap();
