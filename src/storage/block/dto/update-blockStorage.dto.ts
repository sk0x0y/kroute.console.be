import { PartialType } from '@nestjs/mapped-types';
import { CreateBlockStorageDTO } from './create-blockStorage.dto';

export class UpdateBlockStorageDTO extends PartialType(CreateBlockStorageDTO) {}
