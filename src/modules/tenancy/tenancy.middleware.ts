import { NextFunction, Request, Response } from 'express';

const TENTANT_HEADER = 'x-tenant-id';

export function tenancyMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const header = request.headers[TENTANT_HEADER] as string;
  request.tenantId = header?.toString() || null;
  next();
}
