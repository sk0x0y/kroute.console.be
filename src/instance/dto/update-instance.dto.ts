import { PartialType } from '@nestjs/mapped-types';
import { CreateInstanceDTO } from './create-instance.dto';

export class UpdateInstanceDTO extends PartialType(CreateInstanceDTO) {}
