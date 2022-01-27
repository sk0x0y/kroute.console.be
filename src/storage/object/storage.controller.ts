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
import { ObjectStorageService } from './storage.service';
import { CreateObjectStorageDTO } from './dto/create-objectStorage.dto';
import { UpdateObjectStorageDTO } from './dto/update-objectStorage.dto';

@Controller('storage')
export class ObjectStorageController {
  constructor(private readonly storageService: ObjectStorageService) {}

  @Post('/object')
  create(@Res() res: Response, @Body() storageVO: CreateObjectStorageDTO) {
    return this.storageService.create(res, storageVO);
  }

  @Get('/object')
  findAll(@Res() res: Response) {
    return this.storageService.findAll(res);
  }

  @Get('/object/:id')
  findOne(@Res() res: Response, @Param('id') id: string) {
    return this.storageService.findOne(res, +id);
  }

  @Patch('/object/:id')
  update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() storageVO: UpdateObjectStorageDTO,
  ) {
    return this.storageService.update(res, +id, storageVO);
  }

  @Delete('/object/:id')
  remove(@Res() res: Response, @Param('id') id: string) {
    return this.storageService.remove(res, +id);
  }
}
