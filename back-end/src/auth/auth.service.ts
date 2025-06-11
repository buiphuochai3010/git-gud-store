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
      const payload = { username: account.username || account.email, sub: account.id };
      return {
        access_token: this.jwtService.sign(payload),
      }
    } catch (error) {
      console.error('[auth.service.ts][login] error', error);
      throw error;
    }
  }
}
