import { RepositoryEntity } from './RepositoryEntity';

export interface Repository<T extends RepositoryEntity> {
  create(data: Omit<T, 'id' | 'created' | 'lastUpdated'>): RepositoryEntity;
  selectById(id: string | number): Promise<T | null>;
  select(filter: Partial<T>): Promise<T | null>;
  update(id: string | number, data: Partial<T>): Promise<T | null>;
  delete(id: string | number): Promise<boolean>;
}