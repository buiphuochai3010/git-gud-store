import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AccountsService } from '@/modules/accounts/accounts.service';
import { comparePasswordHelper } from '@/helpers/util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService
  ) {}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async login(username: string, password: string) {
    try {
      const account = await this.accountsService.findByUsernameOrEmail(username);

      if (!account) {
        throw new BadRequestException('Tài khoản không tồn tại');
      }

      const is_password_correct = await comparePasswordHelper(password, account.password);

      if (!is_password_correct) {
        throw new BadRequestException('Tài khoản hoặc mật khẩu không hợp lệ');
      }

      const payload = { 
        sub: account.id,
        username: account.username,
      }

      const access_token = await this.jwtService.signAsync(payload);

      return {
        access_token,
      }
    } catch (error) {
      console.error('[auth.service.ts][signIn] error', error);
      throw error;
    }
  }
}
