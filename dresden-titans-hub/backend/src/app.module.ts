import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from './storage/storage.service';
import { VideosModule } from './videos/videos.module'; // <-- Neu importiert

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VideosModule, // <-- Hier angemeldet
  ],
  controllers: [],
  providers: [PrismaService, StorageService],
})
export class AppModule {}