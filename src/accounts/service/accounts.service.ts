import { Injectable } from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountNotFound, ExistsAccountsException } from '../exception/accounts.exception';

@Injectable()
export class AccountsService {
  constructor(@InjectModel('Account') private readonly accountModel: Model<AccountDto>) {}

  async create(accountId: string) {
    const recoveredAccount = await this.findOneByAccountId(accountId);
    if (recoveredAccount) {
      throw new ExistsAccountsException();
    }
    const newAccount = new AccountDto();
    const startValue = 500;

    newAccount.accountID = accountId;
    newAccount.balance = startValue;

    const createdAccount = new this.accountModel(newAccount);
    return await createdAccount.save();
  }

  async findOneByAccountId(accountId: string) {
    const recoveredAccount = await this.accountModel.findOne({ accountId }).exec();

    if (!recoveredAccount) {
      throw new AccountNotFound();
    }

    return this.mountWantedRecoveredData(recoveredAccount);
  }

  mountWantedRecoveredData(recoveredAccount: AccountDto) {
    return {
      conta_id: recoveredAccount.accountID,
      saldo: recoveredAccount.balance,
    };
  }
}
