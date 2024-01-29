import { Request as ExpressRequest } from 'express';
import { Global, Module, Provider, Scope } from '@nestjs/common';
import { CONNECTION } from './tenancy.symbols';
import { getTenantConnection } from './tenancy.utils';
import { REQUEST } from '@nestjs/core';

const connectionFactory: Provider = {
  provide: CONNECTION,
  scope: Scope.REQUEST,
  useFactory: (request: ExpressRequest) => {
    const { tenantId } = request;

    if (tenantId) {
      return getTenantConnection(tenantId);
    }

    return null;
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [connectionFactory],
  exports: [CONNECTION],
})
export class TenancyModule {}
