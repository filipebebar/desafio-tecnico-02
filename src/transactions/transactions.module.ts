import { Module } from '@nestjs/common';
import { TransactionsService } from './service/transactions.service';
import { TransactionsController } from './controller/transactions.controller';
import { AccountsModule } from '../accounts/accounts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from '../schemas/transactions.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]), AccountsModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
