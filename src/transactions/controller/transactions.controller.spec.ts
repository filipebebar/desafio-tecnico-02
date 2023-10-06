import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from '../service/transactions.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { AccountsService } from '../../accounts/service/accounts.service';
import { getModelToken } from '@nestjs/mongoose';

describe('TransactionsController', () => {
  let transactionsController: TransactionsController;
  let transactionsService: TransactionsService;

  beforeEach(async () => {
    const mockTransactionModel = {
      create: jest.fn(),
    };
    const mockAccountModel = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        AccountsService,
        {
          provide: getModelToken('Transaction'),
          useValue: mockTransactionModel,
        },
        {
          provide: getModelToken('Account'),
          useValue: mockAccountModel,
        },
      ],
    }).compile();

    transactionsController = module.get<TransactionsController>(TransactionsController);
    transactionsService = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(transactionsController).toBeDefined();
  });

  describe('create', () => {
    it('should create a transaction', async () => {
      const createTransactionDto = {
        conta_id: '12345',
        valor: 100,
        forma_pagamento: 'P',
      };

      const mockTransactionResponse = {
        accountId: '12345',
        balance: 0,
      };

      jest.spyOn(transactionsService, 'createTransaction').mockResolvedValue(mockTransactionResponse);

      const result = await transactionsController.create(createTransactionDto as CreateTransactionDto);

      expect(result).toEqual(mockTransactionResponse);
      expect(transactionsService.createTransaction).toHaveBeenCalledWith(createTransactionDto);
    });
  });
});
