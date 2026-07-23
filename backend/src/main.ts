import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Sicherheit: Nur dein Next.js Frontend darf Anfragen stellen
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
  });

  // 2. Skalierbarkeit: API Versionierung (Wichtig, wenn die App später wächst)
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // 3. Daten-Integrität: Blockiert alle fehlerhaften Anfragen sofort
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Entfernt böswillige extra-Daten aus Anfragen
      transform: true, // Wandelt Strings in Nummern um, wo nötig
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Coaches Vault API läuft auf: http://localhost:${port}/api/v1`);
}
bootstrap();