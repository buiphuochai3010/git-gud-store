import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { QueryAccountDto } from './dto/query-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPasswordHelper } from 'src/helpers/util';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) { }

  async isUsernameExist(username: string) {
    try {
      const account = await this.prisma.account.findUnique({ where: { username } });
      if (account) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('[accounts.service.ts][isUsernameExist] error', error);
      throw error;
    }
  }

  async isEmailExist(email: string) {
    try {
      const account = await this.prisma.account.findUnique({ where: { email } });
      if (account) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('[accounts.service.ts][isEmailExist] error', error);
      throw error;
    }
  }

  async create(createAccountDto: CreateAccountDto) {
    try {
      const { username, email, password } = createAccountDto;

      // Check if username already exists
      const isUsernameExist = await this.isUsernameExist(username);
      if (isUsernameExist) {
        throw new BadRequestException(`Tên tài khoản đã tồn tại: ${username}. Vui lòng sử dụng tên tài khoản khác.`);
      }

      // Check if email already exists
      const isEmailExist = await this.isEmailExist(email);
      if (isEmailExist) {
        throw new BadRequestException(`Email đã tồn tại: ${email}. Vui lòng sử dụng email khác.`);
      }

      // Hash bcrypt password
      const hashedPassword = await hashPasswordHelper(password);

      // Create an account
      const account = await this.prisma.account.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
        select: {
          username: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          password: false,
        }
      })
      if (!account) {
        throw new BadRequestException('Tạo tài khoản thất bại');
      }

      return {
        message: 'Tạo tài khoản thành công',
        success: true,
        account,
      };
    } catch (error) {
      console.error('[accounts.service.ts][create] error', error);
      throw error;
    }
  }

  async findAll(query: QueryAccountDto) {
    try {
      const { current = 1, pageSize = 10, sort = 'desc', sort_field = 'createdAt', search, filter } = query;

      // Pagination calculation
      const skip = (current - 1) * pageSize;
      const take = pageSize;

      // Where condition
      const where_condition = search ? {
        OR: [
          {
            username: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
          {
            email: {
              contains: search,
              mode: 'insensitive' as const,
            },
          },
        ],
      } : {};

      const total = await this.prisma.account.count({
        where: where_condition,
      });

      const data = await this.prisma.account.findMany({
        where: where_condition,
        orderBy: {
          [sort_field]: sort,
        },
        skip,
        take,
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          password: false,
        }
      });

      return {
        data,
        success: true,
        total,
      };
    } catch (error) {
      console.error('[accounts.service.ts][findAll] error', error);
      throw error;
    }
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
