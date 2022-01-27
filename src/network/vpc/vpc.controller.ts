import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { VpcService } from './vpc.service';
import { CreateVpcDTO } from './dto/create-vpc.dto';
import { UpdateVpcDTO } from './dto/update-vpc.dto';
import { Response } from 'express';

@Controller('network')
export class VpcController {
  constructor(private readonly vpcService: VpcService) {}

  @Post('/vpc')
  create(@Res() res: Response, @Body() vpcVO: CreateVpcDTO) {
    return this.vpcService.create(res, vpcVO);
  }

  @Get('/vpc')
  findAll(@Res() res: Response) {
    return this.vpcService.findAll(res);
  }

  @Get('/vpc/:id')
  findOne(@Res() res: Response, @Param('id') id: string) {
    return this.vpcService.findOne(res, +id);
  }

  @Patch('/vpc/:id')
  update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() vpcVO: UpdateVpcDTO,
  ) {
    return this.vpcService.update(res, +id, vpcVO);
  }

  @Delete('/vpc/:id')
  remove(@Res() res: Response, @Param('id') id: string) {
    return this.vpcService.remove(res, +id);
  }
}
