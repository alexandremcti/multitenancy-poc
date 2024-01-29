import { Inject, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { CONNECTION } from '../../tenancy/tenancy.symbols';

@Injectable()
export class ProductsService {
  private readonly productsRepository: Repository<Product>;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this.productsRepository = connection.getRepository(Product);
  }

  create(createProductDto: CreateProductDto): Promise<Product> {
    const cat = new Product();
    cat.name = createProductDto.name;

    return this.productsRepository.save(cat);
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }
}
