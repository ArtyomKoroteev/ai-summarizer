import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SummarizeService } from './summarize.service';
import type { SummarizeRequest } from '@repo/shared';

@ApiTags('summarize')
@Controller('ai')
export class SummarizeController {
  constructor(private readonly summarizeService: SummarizeService) {}

  @Post('summarize')
  @ApiOperation({ summary: 'Summarize content using AI' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        text: { type: 'string' },
        mode: { type: 'enum', enum: ['short', 'detailed', 'bullets'] },
        language: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Returns summarized text' })
  async summarize(@Body() request: SummarizeRequest) {
    if (!request) {
      throw new BadRequestException('Request is required');
    }
    const result = await this.summarizeService.summarize(request);
    return result;
  }
}
