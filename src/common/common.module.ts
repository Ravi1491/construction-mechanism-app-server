import { Global, Module } from '@nestjs/common';
import { AwsSesService } from './services/aws-ses.service';

@Global()
@Module({
  providers: [AwsSesService],
  exports: [AwsSesService],
})
export class CommonModule {}
