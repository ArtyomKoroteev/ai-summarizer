import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SummarizeService } from './summarize.service';
import { SummarizeRequest } from '@repo/shared';

@ApiTags('summarize')
@Controller('ai')
export class SummarizeController {
  constructor(private readonly summarizeService: SummarizeService) {}

  @Post('summarize')
  @ApiOperation({ summary: 'Summarize content using AI' })
  @ApiBody({ type: SummarizeRequest, description: 'Summarize request' })
  @ApiResponse({ status: 200, description: 'Returns summarized text' })
  async summarize(@Body() request: SummarizeRequest) {
    return this.summarizeService.summarize(request);
  }
}
