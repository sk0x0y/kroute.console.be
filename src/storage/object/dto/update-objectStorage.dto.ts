import { PartialType } from '@nestjs/mapped-types';
import { CreateObjectStorageDTO } from './create-objectStorage.dto';

export class UpdateObjectStorageDTO extends PartialType(
  CreateObjectStorageDTO,
) {}
