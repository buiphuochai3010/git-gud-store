import { IsString, IsPhoneNumber, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsOptional()
    full_name?: string;

    @IsString()
    @IsOptional()
    @IsPhoneNumber('VN')
    phone?: string;

    @IsString()
    @IsOptional()
    address?: string;
}
