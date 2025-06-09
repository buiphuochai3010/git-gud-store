import { IsNotEmpty } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({ message: "Tên tài khoản không được để trống" })
    username!: string;

    @IsNotEmpty({ message: "Mật khẩu không được để trống" })
    password!: string;
}
