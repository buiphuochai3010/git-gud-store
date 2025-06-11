import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AccountsService } from '@/modules/accounts/accounts.service';
import { comparePasswordHelper } from '@/helpers/util';
import { JwtService } from '@nestjs/jwt';
import { CreateAccountDto } from '@/modules/accounts/dto/create-account.dto';
import * as crypto from 'crypto';
import dayjs from 'dayjs';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const account = await this.accountsService.findByUsernameOrEmail(username);

      if (!account) {
        return null;
      }

      const is_password_correct = await comparePasswordHelper(password, account.password);

      if (!account || !is_password_correct) {
        return null;
      }

      return account;
    } catch (error) {
      console.error('[auth.service.ts][validateUser] error', error);
      throw error;
    }
  }

  async login(account: any) {
    try {
      const payload = {
        username: account.username || account.email,
        sub: account.id
      };

      // Tạo access token
      const access_token = this.jwtService.sign(payload);

      // Tạo refresh token
      const refresh_token = crypto.randomBytes(64).toString('hex');
      const refresh_token_expiry = dayjs().add(7, 'day').toDate();

      // Lưu refresh token vào database
      await this.prisma.account.update({
        where: {
          id: account.id
        },
        data: {
          refresh_token,
          refresh_token_expiry
        }
      })

      return {
        access_token,
        refresh_token,
        refresh_token_expiry
      }
    } catch (error) {
      console.error('[auth.service.ts][login] error', error);
      throw error;
    }
  }

  async register(createAccountDto: CreateAccountDto) {
    try {
      const result = await this.accountsService.handleRegisterAccount(createAccountDto);

      // TO-DO: Auto login sau khi tạo tài khoản thành công

      return result;
    } catch (error) {
      console.error('[auth.service.ts][register] error', error);
      throw error;
    }
  }

  async logout(account_id: number) {
    try {
      // Xóa refresh token khỏi database
      await this.prisma.account.update({
        where: {
          id: account_id
        },
        data: {
          refresh_token: null,
          refresh_token_expiry: null
        }
      })

      return {
        message: 'Đăng xuất thành công',
        success: true
      }
    } catch (error) {
      console.error('[auth.service.ts][logout] error', error);
      throw error;
    }
  }

  async getCurrentUser(account_id: number) {
    try {
      const data = await this.prisma.account.findFirst({
        where: {
          id: account_id
        },
        select: {
          id: true,
          username: true,
          email: true,
          account_type: true,
          is_active: true,
          createdAt: true,
          updatedAt: true,
        }
      })

      return {
        message: 'Lấy thông tin tài khoản thành công',
        success: true,
        data,
      };
    } catch (error) {
      console.error('[auth.service.ts][getCurrentUser] error', error);
      throw error;
    }
  }
}
