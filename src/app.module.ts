import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthenticationModule } from './authentication/authentication.module';
import { InstanceModule } from './instance/instance.module';
import { UserModule } from './user/user.module';
import { StorageModule } from './storage/storage.module';
import { NetworkModule } from './network/network.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '49.247.27.96',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'console',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
      logging: 'all',
    }),
    // AuthenticationModule,
    InstanceModule,
    UserModule,
    StorageModule,
    NetworkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
