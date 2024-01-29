import { AbstractEntity } from '../../../abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'products' })
export class Product extends AbstractEntity {
  @Column()
  name: string;
}
