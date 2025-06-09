import { PartialType } from '@nestjs/mapped-types';
import { BaseAccountDto } from './base-account.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateAccountDto {
    @IsNumber()
    @IsNotEmpty()
    id?: number;

    @IsOptional()
    username?: string;

    @IsOptional()
    email?: string;

    @IsOptional()
    password?: string;
}
