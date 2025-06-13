import { Request } from 'express';
import { BaseAccountDto } from '@/modules/accounts/dto/base-account.dto';

export interface AuthenticatedAccountDto extends BaseAccountDto {
    id: number;
}

export interface AuthenticatedRequest extends Request {
    user: AuthenticatedAccountDto;
}

export interface OptionalAuthRequest extends Request {
    user?: BaseAccountDto;
}