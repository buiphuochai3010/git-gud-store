import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { BaseAccountDto } from './base-account.dto';

export class QueryAccountDto {
    @IsOptional()
    @IsNumber()
    page?: number;

    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsString()
    sort?: string;

    @IsOptional()
    @IsString()
    sort_field?: string;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsObject()
    filters?: BaseAccountDto;
} 