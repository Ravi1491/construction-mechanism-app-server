import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorators/public';

@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get('/health')
  async getHello(): Promise<string> {
    return 'I am healthy';
  }
}
