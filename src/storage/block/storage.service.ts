import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CreateBlockStorageDTO } from './dto/create-blockStorage.dto';
import { UpdateBlockStorageDTO } from './dto/update-blockStorage.dto';
import { BlockStorage } from './entities/blockStorage.entity';
import { useTransaction } from '../../interface/transaction';
import uuidv4 from '../../interface/uuid';

@Injectable()
export class BlockStorageService {
  async create(res: Response, storageVO: CreateBlockStorageDTO) {
    await useTransaction(async (queryRunner) => {
      if (!storageVO.name) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: 'name 이 없습니다',
        });
      }
      if (!storageVO.type) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: 'type 이 없습니다',
        });
      }
      if (!storageVO.capacity) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: 'capacity 가 없습니다',
        });
      }
      if (!storageVO.region) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: 'region 이 없습니다',
        });
      }

      const blockStorage = new BlockStorage();
      blockStorage.uuid = `block-${uuidv4()}`;
      blockStorage.name = storageVO.name;
      blockStorage.type = storageVO.type;
      blockStorage.capacity = storageVO.capacity;
      blockStorage.region = storageVO.region;

      const result = await queryRunner.manager.save(blockStorage);
      await queryRunner.commitTransaction();

      return res.status(200).json(result);
    });
  }

  async findAll(res: Response) {
    await useTransaction(async (queryRunner) => {
      const result = await queryRunner.manager.find(BlockStorage);

      return res.status(200).json(result);
    });
  }

  async findOne(res: Response, id: number) {
    await useTransaction(async (queryRunner) => {
      const result = await queryRunner.manager.findOne(BlockStorage, id);
      await queryRunner.commitTransaction();

      if (!result) {
        return res.status(400).json({
          id,
          message: '해당 블록 스토리지가 존재하지 않습니다',
        });
      }

      return res.status(200).json(result);
    });
  }

  async update(res: Response, id: number, storageVO: UpdateBlockStorageDTO) {
    await useTransaction(async (queryRunner) => {
      const record = await queryRunner.manager.findOne(BlockStorage, id);
      if (!record) {
        await queryRunner.commitTransaction();

        return res.status(400).json({
          message: '해당 블록 스토리지가 존재하지 않습니다',
        });
      }

      const blockStorage = new BlockStorage();

      await queryRunner.manager.update(BlockStorage, id, blockStorage);
      const result = await queryRunner.manager.findOne(BlockStorage, id);
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
      const record = await queryRunner.manager.findOne(BlockStorage, id);
      if (!record) {
        await queryRunner.commitTransaction();

        return res.status(400).json({
          message: '해당 블록 스토리지가 존재하지 않습니다',
        });
      }

      await queryRunner.manager.delete(BlockStorage, id);
      await queryRunner.commitTransaction();

      return res.status(200).json(record);
    });
  }
}
