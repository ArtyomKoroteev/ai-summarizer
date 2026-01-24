import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Groq } from 'groq-sdk';

@Injectable()
export class GroqService {
  private client: Groq;
  private model: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('AI_API_KEY');
    if (!apiKey) {
      throw new Error('AI_API_KEY is not set in environment variables');
    }

    this.client = new Groq({
      apiKey,
    });

    this.model =
      this.configService.get<string>('AI_MODEL') || 'llama-3.1-8b-instant';
  }

  async complete(prompt: string) {
    const result = await this.client.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: this.model,
      temperature: 0.1,
      // groq llama-3.1-8b-instant support only type in response_format
      // response_format: { type: 'json_object' },
    });
    return result.choices[0].message.content;
  }
}
