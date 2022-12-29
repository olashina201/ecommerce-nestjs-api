import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RolesGuard } from '../guards/roles.guard';

export const IS_ADMIN_KEY = 'isAdmin';

export function IsAdmin(): <TFunction>(
  target: object | TFunction,
  propertyKey?: string | symbol,
) => void {
  return applyDecorators(
    SetMetadata(IS_ADMIN_KEY, true),
    UseGuards(RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiForbiddenResponse({ description: 'Forbidden resource' }),
  );
}
