import { Injectable } from '@nestjs/common';
import { GroqService } from './groq.service';
import type {
  SummarizeMode,
  SummarizeRequest,
  SummarizeResponse,
} from '@repo/shared';

@Injectable()
export class SummarizeService {
  constructor(private readonly groqService: GroqService) {}

  async summarize(request: SummarizeRequest): Promise<SummarizeResponse> {
    const prompt = this.buildPrompt(request);
    const result = await this.groqService.complete(prompt);
    return this.parseResponse(result);
  }
  private buildPrompt(request: SummarizeRequest): string {
    const instructions = this.buildInstructions(request?.mode);
    const prompt = `You are a professional summarization assistant.
Your task is to extract key ideas from the provided text.
Be concise, factual, and structured.



Language: ${request?.language}
Mode: ${instructions}

Format your response as JSON:
{
  "title": "optional title",
  "summary": ["point 1", "point 2", ...],
  "tags": ["tag1", "tag2", ...]
}

Text to summarize:
${request?.text}`;
    return prompt;
  }

  private buildInstructions(mode: SummarizeMode): string {
    switch (mode) {
      case 'bullets':
        return 'Extract 3–7 key ideas as short bullet points.';
      case 'short':
        return 'Summarize the text into a single short paragraph.';
      case 'detailed':
        return 'Create a structured summary with sections and bullet points.';
      default:
        return 'Extract key ideas from the text.';
    }
  }

  private parseResponse(response: string): SummarizeResponse {
    const parsed: unknown = JSON.parse(response);

    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid response format');
    }

    const result = parsed as Record<string, unknown>;

    const ensureStringArray = (value: unknown): string[] => {
      if (!Array.isArray(value)) return [];
      return value.filter((item): item is string => typeof item === 'string');
    };

    return {
      title: typeof result.title === 'string' ? result.title : '',
      summary: ensureStringArray(result.summary),
      tags: ensureStringArray(result.tags),
    };
  }
}
