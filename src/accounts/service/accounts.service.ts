import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from '../dto/create-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountNotFound, ExistsAccountsException } from '../exception/accounts.exception';

@Injectable()
export class AccountsService {
  constructor(@InjectModel('Account') private readonly accountModel: Model<CreateAccountDto>) {}

  async create(accountID: string) {
    const recoveredAccount = await this.findOneByAccountId(accountID);
    if (recoveredAccount) {
      throw new ExistsAccountsException();
    }
    const newAccount = new CreateAccountDto();
    const startValue = 500;

    newAccount.accountID = accountID;
    newAccount.balance = startValue;

    const createdAccount = new this.accountModel(newAccount);
    return await createdAccount.save();
  }

  async findOneByAccountId(accountID: string) {
    const recoveredAccount = await this.accountModel.findOne({ accountID }).exec();

    console.log({ recoveredAccount });

    if (!recoveredAccount) {
      throw new AccountNotFound();
    }
    return recoveredAccount;
  }

  async getAll() {
    return await this.accountModel.find().exec();
  }
}
