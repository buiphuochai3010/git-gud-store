import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { QueryAccountDto } from './dto/query-account.dto';
import { AuthenticatedRequest } from '@/common/types/request.interface';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @Post()
  create(@Body() createAccountDto: CreateAccountDto, @Req() req: AuthenticatedRequest) {
    return this.accountsService.create(createAccountDto, req);
  }

  @Get()
  async findAll(
    @Query() query: QueryAccountDto
  ) {
    console.log('[accounts.controller.ts][findAll] query', query);
    return this.accountsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch()
  update(@Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
