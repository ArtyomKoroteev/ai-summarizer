import { Injectable } from '@nestjs/common';
import { GroqService } from './groq.service';
import type { SummarizeRequest } from '@repo/shared';

@Injectable()
export class SummarizeService {
  constructor(private readonly groqService: GroqService) {}

  async summarize(request: SummarizeRequest) {
    const prompt = `Summarize the following text in ${request?.language}: ${request?.text}`;
    return await this.groqService.complete(prompt);
  }
}
