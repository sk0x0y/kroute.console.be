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
import { Response } from 'express';
import { InstanceService } from './instance.service';
import { CreateInstanceDTO } from './dto/create-instance.dto';
import { UpdateInstanceDTO } from './dto/update-instance.dto';

@Controller('instance')
export class InstanceController {
  constructor(private readonly instanceService: InstanceService) {}

  @Post()
  create(@Res() res: Response, @Body() instanceVO: CreateInstanceDTO) {
    return this.instanceService.create(res, instanceVO);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.instanceService.findAll(res);
  }

  @Get(':id')
  findOne(@Res() res: Response, @Param('id') id: string) {
    return this.instanceService.findOne(res, +id);
  }

  @Patch(':id')
  update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() instanceVO: UpdateInstanceDTO,
  ) {
    return this.instanceService.update(res, +id, instanceVO);
  }

  @Delete(':id')
  remove(@Res() res: Response, @Param('id') id: string) {
    return this.instanceService.remove(res, +id);
  }
}
