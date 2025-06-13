import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from '@/helpers/email';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, PrismaService, EmailService],
  exports: [AccountsService],
})
export class AccountsModule {}
