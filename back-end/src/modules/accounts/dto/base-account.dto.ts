import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class BaseAccountDto {
    @IsNumber()
    @IsOptional()
    readonly id?: number;

    @IsNotEmpty({ message: 'Tên tài khoản không được để trống' })
    readonly username!: string;

    @IsEmail({}, { message: 'Email không hợp lệ' })
    @IsNotEmpty({ message: 'Email không được để trống' })
    readonly email!: string;

    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
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

    @IsOptional()
    readonly register_code?: number;

    @IsOptional()
    readonly register_code_expiry?: Date;

    @IsOptional()
    readonly deletedAt?: Date;
}
