import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString, MinLength } from 'class-validator';

export type SummarizeMode = 'bullets' | 'short' | 'detailed';
export type SummarizeLanguage = 'auto' | 'en' | 'ru';

const SUMMARIZE_MODES: SummarizeMode[] = ['bullets', 'short', 'detailed'];
const SUMMARIZE_LANGUAGES: SummarizeLanguage[] = ['auto', 'en', 'ru'];

export class SummarizeRequest {
  @ApiProperty({ example: 'Some long text to summarize...' })
  @IsString()
  @MinLength(10)
  text!: string;

  @ApiProperty({ enum: SUMMARIZE_MODES })
  @IsIn(SUMMARIZE_MODES)
  mode!: SummarizeMode;

  @ApiProperty({ enum: SUMMARIZE_LANGUAGES })
  @IsIn(SUMMARIZE_LANGUAGES)
  language!: SummarizeLanguage;
}

export type SummarizeResponse = {
  title?: string;
  summary: string[];
  tags: string[];
};
