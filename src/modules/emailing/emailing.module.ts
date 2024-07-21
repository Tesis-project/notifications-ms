import { Module } from '@nestjs/common';
import { EmailingService } from './emailing.service';
import { EmailingController } from './emailing.controller';

@Module({
  controllers: [EmailingController],
  providers: [EmailingService],
})
export class EmailingModule {}
