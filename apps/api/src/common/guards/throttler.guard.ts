import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(): Promise<void> {
    throw new HttpException(
      {
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message: ['Too many requests. Please wait before trying again.'],
        error: 'Too many requests',
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
