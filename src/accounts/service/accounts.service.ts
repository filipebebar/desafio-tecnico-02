import { HttpStatus, Injectable } from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountNotFound, ExceedsAvailableValue, ExistsAccountsException } from '../exception/accounts.exception';
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

  async findOneByAccountId(accountId: String, creating: boolean) {
    const recoveredAccount = await this.accountModel.findOne({ accountId }).exec();
    if (!recoveredAccount && creating) {
      return recoveredAccount;
    }

    if (recoveredAccount && !creating) {
      return await this.mountWantedRecoveredData(recoveredAccount);
    }
    return new AccountNotFound();
  }

  async mountWantedRecoveredData(recoveredAccount: AccountDto): Promise<AccountDto> {
    return {
      accountId: recoveredAccount.accountId,
      balance: recoveredAccount.balance,
    };
  }

  async updateAccountBalance(accountId: string, newBalance: number): Promise<Account> {
    const account = await this.accountModel.findOne({ accountId }).exec();

    account.balance = newBalance;

    try {
      await account.save();
      return await this.mountWantedRecoveredData(account);
    } catch (error) {
      throw new ExceedsAvailableValue();
    }
  }

  //TODO: retirar antes do ultimo commit
  async getAll() {
    return await this.accountModel.find().exec();
  }
}
