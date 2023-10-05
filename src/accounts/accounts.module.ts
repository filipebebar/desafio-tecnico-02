import { Module } from '@nestjs/common';
import { AccountsService } from './service/accounts.service';
import { AccountsController } from './controller/accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from '../schemas/account.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
