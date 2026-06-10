import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  async getAllVideos() {
    // Holt alle Drills aus der Datenbank, sortiert nach dem neuesten Upload
    return this.prisma.basketballDrill.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}