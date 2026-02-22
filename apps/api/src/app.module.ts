import { Module } from '@nestjs/common';
import { SummarizeModule } from './summarize/summarize.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SummarizeModule,
  ],
})
export class AppModule {}
