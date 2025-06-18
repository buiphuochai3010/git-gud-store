import { Injectable } from '@nestjs/common';
import { AccountsService } from '@/modules/accounts/accounts.service';
import { comparePasswordHelper } from '@/helpers/util';
import { JwtService } from '@nestjs/jwt';
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

  async validateUser(username_or_email: string, password: string): Promise<any> {
    try {
      const account = await this.accountsService.findByUsernameOrEmail(username_or_email);

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
        username: account.username,
        sub: account.id
      };

      // Tạo access token
      const access_token = this.jwtService.sign(payload);

      // Tạo refresh token
      const refresh_token = crypto.randomBytes(64).toString('hex');
      const refresh_token_expiry = dayjs().add(7, 'day').toDate();

      // Lưu refresh token vào database
      const updated_account = await this.prisma.account.update({
        where: {
          id: account.id
        },
        data: {
          refresh_token,
          refresh_token_expiry
        }
      })

      return {
        id: updated_account.id,
        username: updated_account.username,
        email: updated_account.email,
        access_token,
        refresh_token,
        refresh_token_expiry
      }
    } catch (error) {
      console.error('[auth.service.ts][login] error', error);
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
