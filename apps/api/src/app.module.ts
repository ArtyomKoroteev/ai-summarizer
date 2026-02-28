import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SummarizeModule } from './summarize/summarize.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CustomThrottlerGuard } from './common/guards/throttler.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 20000, // 20 seconds
          limit: 3,
        },
      ],
    }),
    SummarizeModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
