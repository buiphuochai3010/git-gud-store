import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAccountDto {
    @IsString()
    @IsNotEmpty()
    readonly username!: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email!: string;

    @IsString()
    @IsNotEmpty()
    readonly password!: string;

    @IsEnum(['LOCAL', 'GOOGLE'])
    @IsOptional()
    readonly account_type?: 'LOCAL' | 'GOOGLE';

    @IsNumber()
    @IsOptional()
    readonly user_id?: number;

    @IsNumber()
    @IsOptional()
    readonly avatar_id?: number;

    @IsOptional()
    readonly is_active?: boolean;
}
