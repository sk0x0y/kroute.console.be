import { Injectable } from '@nestjs/common';
import { CreateVpcDTO } from './dto/create-vpc.dto';
import { UpdateVpcDTO } from './dto/update-vpc.dto';
import { useTransaction } from '../../interface/transaction';
import { VPC } from './entities/vpc.entity';
import { Response } from 'express';
import uuidv4 from '../../interface/uuid';

@Injectable()
export class VpcService {
  async create(res: Response, vpcVO: CreateVpcDTO) {
    await useTransaction(async (queryRunner) => {
      if (!vpcVO.name) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: 'name 이 없습니다',
        });
      }
      if (!vpcVO.cidr) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: 'cidr 이 없습니다',
        });
      }
      if (!vpcVO.region) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: 'region 이 없습니다',
        });
      }

      const vpc = new VPC();
      vpc.uuid = `vpc-${uuidv4()}`;
      vpc.name = vpcVO.name;
      vpc.cidr = vpcVO.cidr;
      vpc.region = vpcVO.region;

      const result = await queryRunner.manager.save(vpc);
      await queryRunner.commitTransaction();

      return res.status(200).json(result);
    });
  }

  async findAll(res: Response) {
    await useTransaction(async (queryRunner) => {
      const result = await queryRunner.manager.find(VPC);
      await queryRunner.commitTransaction();

      return res.status(200).json(result);
    });
  }

  async findOne(res: Response, id: number) {
    await useTransaction(async (queryRunner) => {
      const record = await queryRunner.manager.findOne(VPC, id);
      console.log(record);
      await queryRunner.commitTransaction();

      return res.status(200).json(record);
    });
  }

  async update(res: Response, id: number, vpcVO: UpdateVpcDTO) {
    await useTransaction(async (queryRunner) => {
      const record = await queryRunner.manager.findOne(VPC, id);
      if (!record) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: '해당 VPC가 존재하지 않습니다',
        });
      }

      const vpc = new VPC();
      vpc.name = vpcVO.name ?? record.name;
      vpc.cidr = vpcVO.cidr ?? record.cidr;

      await queryRunner.manager.update(VPC, id, vpc);
      const result = await queryRunner.manager.findOne(VPC, id);
      await queryRunner.commitTransaction();

      return res.status(200).json({
        id,
        request: vpcVO,
        response: result,
        message: '성공적으로 업데이트 되었습니다',
      });
    });
  }

  async remove(res: Response, id: number) {
    await useTransaction(async (queryRunner) => {
      const record = await queryRunner.manager.findOne(VPC, id);
      if (!record) {
        await queryRunner.rollbackTransaction();

        return res.status(400).json({
          message: '해당 VPC가 존재하지 않습니다',
        });
      }

      const result = await queryRunner.manager.delete(VPC, id);
      await queryRunner.commitTransaction();

      return res.status(200).json(record);
    });
  }
}
