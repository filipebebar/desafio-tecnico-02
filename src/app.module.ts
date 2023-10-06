import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [MongooseModule.forRoot(`mongodb://host.docker.internal:27017/local`), AccountsModule, TransactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
