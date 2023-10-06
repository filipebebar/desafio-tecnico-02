import {HttpStatus, Injectable} from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountNotFound, ExistsAccountsException } from '../exception/accounts.exception';

@Injectable()
export class AccountsService {
  constructor(@InjectModel('Account') private readonly accountModel: Model<AccountDto>) {}

  async create(accountId: string, creating: boolean) {
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
      return HttpStatus.CREATED
    }catch (e) {
      throw new Error(e)
    }
  }

  async findOneByAccountId(accountId: string, creating: boolean) {
    const recoveredAccount = await this.accountModel.findOne({ accountId }).exec();
    if(!recoveredAccount && creating){
      return recoveredAccount
    }

    if (recoveredAccount && !creating) {
      return this.mountWantedRecoveredData(recoveredAccount);
    }
    throw new AccountNotFound
  }

  mountWantedRecoveredData(recoveredAccount: AccountDto) {
    return {
      conta_id: recoveredAccount.accountId,
      saldo: recoveredAccount.balance,
    };
  }

  async getAll() {
    return await this.accountModel.find().exec();
  }
}
