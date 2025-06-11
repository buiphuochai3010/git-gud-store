import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { QueryAccountDto } from './dto/query-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPasswordHelper } from 'src/helpers/util';
import { BaseAccountDto } from './dto/base-account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createAccountDto: CreateAccountDto) {
    try {
      const { username, email, password } = createAccountDto;

      // Check if username already exists
      const is_username_exist = await this.prisma.account.findUnique({ where: { username } });
      if (is_username_exist) {
        throw new BadRequestException(`Tên tài khoản đã tồn tại: ${username}. Vui lòng sử dụng tên tài khoản khác.`);
      }

      // Check if email already exists
      const is_email_exist = await this.prisma.account.findUnique({ where: { email } });
      if (is_email_exist) {
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
          id: true,
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

      // console.log('[create] account', account);
      // console.log('[create] JSON.stringify(account)', JSON.stringify(account));
      // Create an audit log
      // const audit_log = await this.prisma.auditLog.create({
      //   data: {
      //     account_id: undefined, // Temporary undefined, because account_id must be the guy who created the account
      //     action: 'CREATE',
      //     table_name: 'ACCOUNT',
      //     new_data: JSON.stringify(account),
      //     old_data: undefined,
      //   }
      // })

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

  async handleRegisterAccount(createAccountDto: CreateAccountDto) {
    try {
      const { username, email, password } = createAccountDto;

      // Check if username already exists
      const is_username_exist = await this.prisma.account.findUnique({ where: { username } });
      if (is_username_exist) {
        throw new BadRequestException(`Tên tài khoản đã tồn tại: ${username}. Vui lòng sử dụng tên tài khoản khác.`);
      }

      // Check if email already exists
      const is_email_exist = await this.prisma.account.findUnique({ where: { email } });
      if (is_email_exist) {
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
          is_active: false,
          account_type: 'LOCAL',
          
        },
        select: {
          id: true,
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

      // console.log('[create] account', account);
      // console.log('[create] JSON.stringify(account)', JSON.stringify(account));
      // Create an audit log
      // const audit_log = await this.prisma.auditLog.create({
      //   data: {
      //     account_id: undefined, // Temporary undefined, because account_id must be the guy who created the account
      //     action: 'CREATE',
      //     table_name: 'ACCOUNT',
      //     new_data: JSON.stringify(account),
      //     old_data: undefined,
      //   }
      // })

      return {
        message: 'Tạo tài khoản thành công',
        success: true,
        account,
      };
    } catch (error) {
      console.error('[accounts.service.ts][handleRegisterAccount] error', error);
      throw error;
    }
  }

  async findAll(query: QueryAccountDto) {
    try {
      const {
        current = 1,
        pageSize = 10,
        sort = 'desc', // desc, asc
        sort_field = 'createdAt',
        search,
        filter
      } = query;

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

  async update(updateAccountDto: UpdateAccountDto) {
    try {
      const { id, username, email, password } = updateAccountDto;

      const account = await this.prisma.account.findUnique({ where: { id } });
      if (!account) {
        throw new BadRequestException('Tài khoản không tồn tại');
      }

      let update_data: UpdateAccountDto = {};

      // Check if username already exists
      if (username && username !== account.username) {
        const is_username_exist = await this.prisma.account.findUnique({ where: { username } });
        if (is_username_exist) {
          throw new BadRequestException(`Tên tài khoản đã tồn tại: ${username}. Vui lòng sử dụng tên tài khoản khác.`);
        }
        update_data.username = username;
      }

      // Check if email already exists
      if (email && email !== account.email) {
        const is_email_exist = await this.prisma.account.findUnique({ where: { email } });
        if (is_email_exist) {
          throw new BadRequestException(`Email đã tồn tại: ${email}. Vui lòng sử dụng email khác.`);
        }
        update_data.email = email;
      }

      if (password) {
        const hashed_password = await hashPasswordHelper(password);
        update_data.password = hashed_password;
      }

      const updated_account = await this.prisma.account.update({
        where: { id },
        data: {
          ...updateAccountDto,
        },
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          password: false,
        }
      })

      return {
        message: 'Cập nhật tài khoản thành công',
        success: true,
        data: updated_account,
      }
    } catch (error) {
      console.error('[accounts.service.ts][update] error', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const account = await this.prisma.account.findFirst({ where: { id } });
      if (!account) {
        throw new BadRequestException('Tài khoản không tồn tại');
      }
      if (process.env.SOFT_DELETE) {
        await this.prisma.account.update({
          where: { id },
          data: {
            deletedAt: new Date(),
          }
        })
      } else {
        await this.prisma.account.delete({ where: { id } });
      }
      return {
        message: 'Xóa tài khoản thành công',
        success: true,
      }
    } catch (error) {
      console.error('[accounts.service.ts][remove] error', error);
      throw error;
    }
  }

  async findByUsernameOrEmail(usernameOrEmail: string) {
    try {
      return await this.prisma.account.findFirst({
        where: {
          OR: [
            { username: usernameOrEmail },
            { email: usernameOrEmail }
          ]
        }
      });
    } catch (error) {
      console.error('[accounts.service.ts][findByUsernameOrEmail] error', error);
      throw error;
    }
  }

}
