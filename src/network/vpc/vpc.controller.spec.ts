import { Test, TestingModule } from '@nestjs/testing';
import { VpcController } from './vpc.controller';
import { VpcService } from './vpc.service';

describe('VpcController', () => {
  let controller: VpcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VpcController],
      providers: [VpcService],
    }).compile();

    controller = module.get<VpcController>(VpcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
