import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPasswordHelper } from 'src/helpers/util';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAccountDto: CreateAccountDto) {
    // Hash bcrypt password
    try {
      const hashedPassword = await hashPasswordHelper(createAccountDto.password);
      return 'This action adds a new account';
    } catch (error) {
      console.log('[accounts.service.ts][create] error', error);
    }
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
