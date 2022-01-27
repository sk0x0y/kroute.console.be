import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VPC } from './vpc/entities/vpc.entity';
import { VpcController } from './vpc/vpc.controller';
import { VpcService } from './vpc/vpc.service';

@Module({
  imports: [TypeOrmModule.forFeature([VPC])],
  controllers: [VpcController],
  providers: [VpcService],
})
export class NetworkModule {}
