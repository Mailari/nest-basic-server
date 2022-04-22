import { Get, Param, Post, Body, Put, Delete, Controller, UsePipes, UseGuards } from '@nestjs/common';
import { JoiValidationPipe } from '../pipes/validation.pipe';
import { ProductService } from '../services/product.service';
import { AuthGuard } from '../guards/auth.guard';
import { Product } from './../entities/product.entity';
import { productCreateSchema, productUpdateSchema } from './../validations/product.validation.schema';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  @UsePipes(new JoiValidationPipe(productCreateSchema))
  create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(productUpdateSchema))
  update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<any> {
    return this.productService.delete(id);
  }
}
