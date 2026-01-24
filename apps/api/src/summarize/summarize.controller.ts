import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SummarizeService } from './summarize.service';

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
        language: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Returns summarized text' })
  async summarize(@Body() request: { text: string; language: string }) {
    return await this.summarizeService.summarize(
      request.text,
      request.language,
    );
    // return this.summarizeService.summarize(body.text);
  }
}
