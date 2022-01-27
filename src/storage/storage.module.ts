import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockStorage } from './block/entities/blockStorage.entity';
import { BlockStorageService } from './block/storage.service';
import { BlockStorageController } from './block/storage.controller';
import { ObjectStorage } from './object/entities/objectStorage.entity';
import { ObjectStorageService } from './object/storage.service';
import { ObjectStorageController } from './object/storage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BlockStorage, ObjectStorage])],
  controllers: [BlockStorageController, ObjectStorageController],
  providers: [BlockStorageService, ObjectStorageService],
})
export class StorageModule {}
