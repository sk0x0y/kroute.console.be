import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ObjectStorage } from './entities/objectStorage.entity';
import { CreateObjectStorageDTO } from './dto/create-objectStorage.dto';
import { UpdateObjectStorageDTO } from './dto/update-objectStorage.dto';
import { useTransaction } from '../../interface/transaction';
import uuidv4 from '../../interface/uuid';

@Injectable()
export class ObjectStorageService {
  async create(res: Response, storageVO: CreateObjectStorageDTO) {
    await useTransaction(async (queryRunner) => {
      if (!storageVO.name) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: 'name 이 없습니다',
        });
      }
      if (!storageVO.class) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: 'class 가 없습니다',
        });
      }
      if (!storageVO.access_policy) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: 'access_policy 가 없습니다',
        });
      }
      if (!storageVO.region) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: 'region 이 없습니다',
        });
      }

      const objectStorage = new ObjectStorage();
      objectStorage.uuid = `object-${uuidv4()}`;
      objectStorage.name = storageVO.name;
      objectStorage.class = storageVO.class;
      objectStorage.access_policy = storageVO.access_policy;
      objectStorage.region = storageVO.region;

      const result = await queryRunner.manager.save(objectStorage);
      await queryRunner.commitTransaction();

      return res.status(200).json(result);
    });
  }

  async findAll(res: Response) {
    await useTransaction(async (queryRunner) => {
      const result = await queryRunner.manager.find(ObjectStorage);

      return res.status(200).json(result);
    });
  }

  async findOne(res: Response, id: number) {
    await useTransaction(async (queryRunner) => {
      const result = await queryRunner.manager.findOne(ObjectStorage, id);
      await queryRunner.commitTransaction();

      if (!result) {
        return res.status(400).json({
          id,
          message: '해당 오브젝트 스토리지가 존재하지 않습니다',
        });
      }

      return res.status(200).json(result);
    });
  }

  async update(res: Response, id: number, storageVO: UpdateObjectStorageDTO) {
    await useTransaction(async (queryRunner) => {
      const record = await queryRunner.manager.findOne(ObjectStorage, id);
      if (!record) {
        await queryRunner.commitTransaction();

        return res.status(400).json({
          message: '해당 오브젝트 스토리지가 존재하지 않습니다',
        });
      }

      const objectStorage = new ObjectStorage();
      objectStorage.name = storageVO.name ?? record.name;
      objectStorage.access_policy =
        storageVO.access_policy ?? record.access_policy;

      await queryRunner.manager.update(ObjectStorage, id, objectStorage);
      const result = await queryRunner.manager.findOne(ObjectStorage, id);
      await queryRunner.commitTransaction();

      return res.status(200).json({
        id,
        request: storageVO,
        response: result,
        message: '성공적으로 업데이트 되었습니다',
      });
    });
  }

  async remove(res: Response, id: number) {
    await useTransaction(async (queryRunner) => {
      const record = await queryRunner.manager.findOne(ObjectStorage, id);
      if (!record) {
        await queryRunner.commitTransaction();

        return res.status(400).json({
          message: '해당 오브젝트 스토리지가 존재하지 않습니다',
        });
      }

      await queryRunner.manager.delete(ObjectStorage, id);
      await queryRunner.commitTransaction();

      return res.status(200).json(record);
    });
  }
}
