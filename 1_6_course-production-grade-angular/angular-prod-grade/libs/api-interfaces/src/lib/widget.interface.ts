import { BaseEntity } from './base-entity.interface';

export interface Widget extends BaseEntity {
  title: string;
  description: string;
}
