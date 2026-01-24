import { Module } from '@nestjs/common';
import { SummarizeController } from './summarize.controller';
import { GroqService } from './groq.service';
import { SummarizeService } from './summarize.service';

@Module({
  imports: [],
  controllers: [SummarizeController],
  providers: [GroqService, SummarizeService],
})
export class SummarizeModule {}
