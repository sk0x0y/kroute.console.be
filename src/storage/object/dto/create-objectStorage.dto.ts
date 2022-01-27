import { AccessPolicy, StorageClass } from '../entities/objectStorage.entity';

export class CreateObjectStorageDTO {
  name: string;
  class: StorageClass;
  size: number;
  access_policy: AccessPolicy;
  region: string;
}
