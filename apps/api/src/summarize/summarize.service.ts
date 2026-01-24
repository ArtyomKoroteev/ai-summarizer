import { Injectable } from '@nestjs/common';
import { GroqService } from './groq.service';

@Injectable()
export class SummarizeService {
  constructor(private readonly groqService: GroqService) {}

  async summarize(text: string, language: string) {
    const prompt = `Summarize the following text in ${language}: ${text}`;
    return await this.groqService.complete(prompt);
  }
}
