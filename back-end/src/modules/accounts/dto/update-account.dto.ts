import { PartialType } from '@nestjs/mapped-types';
import { BaseAccountDto } from './base-account.dto';

export class UpdateAccountDto extends PartialType(BaseAccountDto) {}
