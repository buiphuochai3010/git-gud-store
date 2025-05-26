import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAccountDto {
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
}
