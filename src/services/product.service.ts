import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './../entities/product.entity';

export class ProductService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepo.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productRepo.findOneByOrFail({ id }).catch((err) => {
      throw new NotFoundException('Product not found');
    });
  }

  async create(product: Product): Promise<Product> {
    return await this.productRepo.save(product);
  }

  async update(id: string, product: Product): Promise<any> {
    await this.findOne(id);
    await this.productRepo.update(id, product);
    return await this.findOne(id);
  }

  async delete(id: string): Promise<any> {
    await this.findOne(id);
    return await this.productRepo.delete(id);
  }
}
