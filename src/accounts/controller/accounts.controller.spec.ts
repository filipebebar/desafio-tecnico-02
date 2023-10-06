import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from '../service/accounts.service';
import { HttpStatus } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

describe('AccountsController', () => {
  let accountsController: AccountsController;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const mockAccountModel = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        AccountsService,
        {
          provide: getModelToken('Account'),
          useValue: mockAccountModel,
        },
      ],
    }).compile();

    accountsController = module.get<AccountsController>(AccountsController);
    accountsService = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(accountsController).toBeDefined();
  });

  describe('create', () => {
    it('should create an account', async () => {
      const accountId = '12345';
      const mockHttpStatus = HttpStatus.CREATED;

      jest.spyOn(accountsService, 'createAccount').mockResolvedValue(mockHttpStatus);

      const result = await accountsController.create(accountId);

      expect(result).toEqual(mockHttpStatus);
      expect(accountsService.createAccount).toHaveBeenCalledWith(accountId, true);
    });
  });

  describe('findOne', () => {
    it('should find an existing account', async () => {
      // Arrange
      const accountId = '12345';
      const mockAccountResponse = {
        accountId: '12345',
        balance: 400,
      };

      jest.spyOn(accountsService, 'findOneByAccountId').mockResolvedValue(mockAccountResponse);

      // Act
      const result = await accountsController.findOne(accountId);

      // Assert
      expect(result).toEqual(mockAccountResponse);
      expect(accountsService.findOneByAccountId).toHaveBeenCalledWith(accountId, false);
    });
  });
});
