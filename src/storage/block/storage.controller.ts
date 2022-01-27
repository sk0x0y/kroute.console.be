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
import { BlockStorageService } from './storage.service';
import { CreateBlockStorageDTO } from './dto/create-blockStorage.dto';
import { UpdateBlockStorageDTO } from './dto/update-blockStorage.dto';

@Controller('storage')
export class BlockStorageController {
  constructor(private readonly storageService: BlockStorageService) {}

  @Post('/block')
  create(@Res() res: Response, @Body() storageVO: CreateBlockStorageDTO) {
    return this.storageService.create(res, storageVO);
  }

  @Get('/block')
  findAll(@Res() res: Response) {
    return this.storageService.findAll(res);
  }

  @Get('/block/:id')
  findOne(@Res() res: Response, @Param('id') id: string) {
    return this.storageService.findOne(res, +id);
  }

  @Patch('/block/:id')
  update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() storageVO: UpdateBlockStorageDTO,
  ) {
    return this.storageService.update(res, +id, storageVO);
  }

  @Delete('/block/:id')
  remove(@Res() res: Response, @Param('id') id: string) {
    return this.storageService.remove(res, +id);
  }
}
