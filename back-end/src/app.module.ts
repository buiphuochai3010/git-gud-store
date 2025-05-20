import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';
import { UsersModule } from './modules/users/users.module';
import { AccountsModule } from './modules/accounts/accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AccountsModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule { }
