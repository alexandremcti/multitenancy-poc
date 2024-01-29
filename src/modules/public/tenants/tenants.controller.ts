import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { Tenant } from 'src/modules/public/tenants/tenant.entity';
import { TenantsService } from 'src/modules/public/tenants/tenants.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  create(@Body() createTenantDto: CreateTenantDto): Promise<Tenant> {
    return this.tenantsService.create(createTenantDto);
  }

  @Get()
  findAll(): Promise<Tenant[]> {
    return this.tenantsService.findAll();
  }
}
