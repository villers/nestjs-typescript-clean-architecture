import { Module } from '@nestjs/common';
import StatusModule from './status/status.module';
import UserModule from './user/user.module';

import { InfrastructureModule } from './shared/infrastructue/infrastructure.module';

@Module({
  imports: [InfrastructureModule, StatusModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
