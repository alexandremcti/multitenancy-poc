import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import connectionConfig from './orm.config';
import { TenantsModule } from './modules/public/tenants/tenants.module';
import { TenancyModule } from './modules/tenancy/tenancy.module';
import { ProductsModule } from './modules/tenanted/product/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionConfig),
    TenantsModule,
    TenancyModule,
    ProductsModule,
  ],
})
export class AppModule {}
