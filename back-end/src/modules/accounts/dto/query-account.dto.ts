import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { BaseAccountDto } from './base-account.dto';

export class QueryAccountDto {
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    current?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    pageSize?: number;

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
    filter?: BaseAccountDto;
} 