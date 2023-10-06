import { HttpStatus, Injectable } from '@nestjs/common';
import { AccountDto, IAccount } from '../dto/account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountNotFound, ExistsAccountsException } from '../exception/accounts.exception';
import { Account } from '../../schemas/account.schema';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) {}

  async create(accountId: string, creating: boolean): Promise<HttpStatus> {
    const recoveredAccount = await this.findOneByAccountId(accountId, creating);
    if (recoveredAccount || recoveredAccount != null) {
      throw new ExistsAccountsException();
    }
    const newAccount = new AccountDto();
    const startValue = 500;

    newAccount.accountId = accountId;
    newAccount.balance = startValue;

    try {
      const createdAccount = new this.accountModel(newAccount);
      await createdAccount.save();
      return HttpStatus.CREATED;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findOneByAccountId(accountId: string, creating: boolean) {
    const recoveredAccount = await this.accountModel.findOne({ accountId }).exec();
    if (!recoveredAccount && creating) {
      return recoveredAccount;
    }

    if (recoveredAccount && !creating) {
      return await this.mountWantedRecoveredData(recoveredAccount);
    }
    return new AccountNotFound();
  }

  async mountWantedRecoveredData(recoveredAccount: any): Promise<IAccount> {
    return {
      accountId: recoveredAccount.accountId,
      balance: recoveredAccount.balance,
    };
  }

  //TODO: retirar antes do ultimo commit
  async getAll() {
    return await this.accountModel.find().exec();
  }
}
