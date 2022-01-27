import { StorageType } from '../entities/blockStorage.entity';

export class CreateBlockStorageDTO {
  name: string;
  type: StorageType;
  capacity: number;
  region: string;
}
