import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { AccountsService } from '../../accounts/service/accounts.service';
import { Transaction } from '../../schemas/transactions.schema';
import { ExceedsAvailableValue } from '../../accounts/exception/accounts.exception';
import { AccountNotFound, InvalidPaymentForm } from '../exception/transactions.exception';
import { getModelToken } from '@nestjs/mongoose';
import { EPaymentOrder, ICreateTransaction } from '../dto/create-transaction.dto';

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: AccountsService,
          useValue: {
            findOneByAccountId: jest.fn(),
            updateAccountBalance: jest.fn(),
          },
        },
        {
          provide: getModelToken(Transaction.name),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    transactionsService = module.get<TransactionsService>(TransactionsService);
    accountsService = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(transactionsService).toBeDefined();
  });

  describe('create', () => {
    it('should create a transaction', async () => {
      const mockAccount = {
        accountId: '12345',
        balance: 500,
      };

      const mockTransaction: ICreateTransaction = {
        conta_id: '12345',
        valor: 100,
        forma_pagamento: EPaymentOrder.PIX,
      };

      const mockUpdatedAccount = {
        accountId: '12345',
        balance: 400,
      };

      jest.spyOn(transactionsService, 'getAccountInfo').mockResolvedValue(mockAccount);
      jest.spyOn(transactionsService, 'removeValueFromAccountBalance').mockResolvedValue(mockUpdatedAccount);

      const result = await transactionsService.createTransaction(mockTransaction);

      expect(result).toEqual(mockUpdatedAccount);
      expect(transactionsService.getAccountInfo).toHaveBeenCalledWith('12345');
      expect(transactionsService.removeValueFromAccountBalance).toHaveBeenCalledWith(
        mockAccount,
        100,
        EPaymentOrder.PIX,
      );
    });

    it('should throw ExceedsAvailableValue if balance is insufficient', async () => {
      const mockAccount = {
        accountId: '12345',
        balance: 5,
      };
      jest.spyOn(accountsService, 'findOneByAccountId').mockResolvedValue(mockAccount);

      const createTransactionData = {
        conta_id: '12345',
        valor: 10,
        forma_pagamento: EPaymentOrder.DEBIT_CARD,
      };

      await expect(transactionsService.createTransaction(createTransactionData)).rejects.toThrow(ExceedsAvailableValue);
    });

    it('should throw InvalidPaymentForm for unsupported payment form', async () => {
      const createTransactionData = {
        conta_id: '12345',
        valor: 10,
        forma_pagamento: 'E',
      };

      await expect(transactionsService.createTransaction(createTransactionData)).rejects.toThrow(InvalidPaymentForm);
    });

    it('should throw AccountNotFound if account is not found', async () => {
      jest.spyOn(accountsService, 'findOneByAccountId').mockRejectedValue(new AccountNotFound());

      const createTransactionData = {
        conta_id: '12345',
        valor: 10,
        forma_pagamento: EPaymentOrder.DEBIT_CARD,
      };

      await expect(transactionsService.createTransaction(createTransactionData)).rejects.toThrow(AccountNotFound);
    });
  });
});
