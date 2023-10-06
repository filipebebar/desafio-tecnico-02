import { Injectable } from '@nestjs/common';
import { EPaymentOrder, ICreateTransaction, TransactionDto } from '../dto/create-transaction.dto';
import { AccountsService } from '../../accounts/service/accounts.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from '../../schemas/transactions.schema';
import { ExceedsAvailableValue } from '../../accounts/exception/accounts.exception';
import { AccountDto } from '../../accounts/dto/account.dto';
import { AccountNotFound, InvalidPaymentForm } from '../exception/transactions.exception';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly accountsService: AccountsService,
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async createTransaction(createTransaction: ICreateTransaction): Promise<any> {
    const account = await this.getAccountInfo(createTransaction.conta_id);
    const calculateAmount = this.makeOperationValueAndTaxValue(createTransaction);
    return this.removeValueFromAccountBalance(account, calculateAmount, createTransaction.forma_pagamento);
  }

  async getAccountInfo(conta_id: String): Promise<AccountDto | AccountNotFound> {
    try {
      return await this.accountsService.findOneByAccountId(conta_id, false);
    } catch (e) {
      throw new AccountNotFound();
    }
  }

  makeOperationValueAndTaxValue(createTransaction: any) {
    let taxPercentage: number;

    switch (createTransaction.forma_pagamento) {
      case EPaymentOrder.DEBIT_CARD:
        taxPercentage = 0.03;
        break;
      case EPaymentOrder.CREDIT_CARD:
        taxPercentage = 0.05;
        break;
      case EPaymentOrder.PIX:
        taxPercentage = 0.0;
        break;
      default:
        throw new InvalidPaymentForm();
    }
    const paymentValue = createTransaction.valor;

    return paymentValue + paymentValue * taxPercentage;
  }

  async removeValueFromAccountBalance(account: any, calculateAmount: number, paymentForm: any): Promise<AccountDto> {
    const newBalance = account.balance - calculateAmount;
    if (newBalance < 0) {
      throw new ExceedsAvailableValue();
    }
    const newTransaction = new TransactionDto();
    newTransaction.accountId = account.accountId;
    newTransaction.value = calculateAmount;
    newTransaction.paymentForm = paymentForm;

    const createdTransaction = new this.transactionModel(newTransaction);
    try {
      const updatedAccount = await this.accountsService.updateAccountBalance(account.accountId, newBalance);
      await createdTransaction.save();

      return updatedAccount;
    } catch (e) {
      throw new Error(e);
    }
  }

  //TODO: retirar antes do ultimo commit
  async getAll() {
    return await this.transactionModel.find().exec();
  }
}
