// import { PartialType } from '@nestjs/mapped-types';
// import { CreateVpcDto } from './create-vpc.dto';
//
// export class UpdateVpcDto extends PartialType(CreateVpcDto) {}
import { CreateVpcDTO } from './create-vpc.dto';

export type UpdateVpcDTO = Exclude<CreateVpcDTO, 'region'>;
