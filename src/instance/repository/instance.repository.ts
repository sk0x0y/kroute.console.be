import { EntityRepository, Repository } from 'typeorm';
import { Instance } from '../entities/instance.entity';

@EntityRepository(Instance)
export class InstanceRepository extends Repository<Instance> {}
