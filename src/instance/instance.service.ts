import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CreateInstanceDTO } from './dto/create-instance.dto';
import { UpdateInstanceDTO } from './dto/update-instance.dto';
import { Instance } from './entities/instance.entity';
import { useTransaction } from '../interface/transaction';
import uuidv4 from '../interface/uuid';

@Injectable()
export class InstanceService {
  async create(res: Response, instanceVO: CreateInstanceDTO) {
    await useTransaction(async (queryRunner) => {
      if (!instanceVO.name) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: 'name 이 없습니다',
        });
      }
      if (!instanceVO.flavor) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: 'flavor 가 없습니다',
        });
      }
      if (!instanceVO.ipv4_address) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: 'ipv4_address 가 없습니다',
        });
      }
      if (!instanceVO.region) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: 'region 이 없습니다',
        });
      }

      const instance = new Instance();
      instance.uuid = `instance-${uuidv4()}`;
      instance.name = instanceVO.name;
      instance.flavor = instanceVO.flavor;
      instance.ipv4_address = instanceVO.ipv4_address;
      instance.region = instanceVO.region;

      const result = await queryRunner.manager.save(instance);
      await queryRunner.commitTransaction();

      return res.status(200).json(result);
    });
  }

  async findAll(res: Response) {
    await useTransaction(async (queryRunner) => {
      const result = await queryRunner.manager.find(Instance);
      await queryRunner.commitTransaction();

      return res.status(200).json(result);
    });
  }

  async findOne(res: Response, id: number) {
    await useTransaction(async (queryRunner) => {
      const result = await queryRunner.manager.findOne(Instance, id);
      await queryRunner.commitTransaction();

      if (!result) {
        return res.status(400).json({
          id,
          message: '해당 인스턴스가 존재하지 않습니다',
        });
      }

      return res.status(200).json(result);
    });
  }

  async update(res: Response, id: number, instanceVO: UpdateInstanceDTO) {
    await useTransaction(async (queryRunner) => {
      const record = await queryRunner.manager.findOne(Instance, id);
      if (!record) {
        await queryRunner.commitTransaction();

        return res.status(400).json({
          message: '해당 인스턴스가 존재하지 않습니다',
        });
      }

      const instance = new Instance();
      instance.name = instanceVO.name ?? record.name;
      instance.flavor = instanceVO.flavor ?? record.flavor;
      instance.ipv4_address = instanceVO.ipv4_address ?? record.ipv4_address;
      instance.ipv6_address = instanceVO.ipv6_address ?? record.ipv6_address;

      await queryRunner.manager.update(Instance, id, instance);
      const result = await queryRunner.manager.findOne(Instance, id);
      await queryRunner.commitTransaction();

      return res.status(200).json({
        id,
        request: instanceVO,
        response: result,
        message: '성공적으로 업데이트 되었습니다',
      });
    });
  }

  async remove(res: Response, id: number) {
    await useTransaction(async (queryRunner) => {
      const record = await queryRunner.manager.findOne(Instance, id);
      if (!record) {
        await queryRunner.commitTransaction();

        return res.status(400).json({
          message: '해당 인스턴스가 존재하지 않습니다',
        });
      }

      await queryRunner.manager.delete(Instance, id);
      await queryRunner.commitTransaction();

      return res.status(200).json(record);
    });
  }
}
