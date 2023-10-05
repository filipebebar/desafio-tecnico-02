import { Controller, Get, Param, Post } from '@nestjs/common';
import { AccountsService } from '../service/accounts.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TemplateApiException } from '../../utils/swagger/template-api-exception';
import { AccountNotFound, ExistsAccountsException } from '../exception/accounts.exception';

@ApiTags('conta')
@Controller('conta')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post(':accountID')
  @ApiOperation({ summary: 'Salva a conta' })
  @TemplateApiException(() => [ExistsAccountsException])
  create(@Param('accountID') accountID: string) {
    return this.accountsService.create(accountID);
  }

  @Get(':accountID')
  @ApiOperation({ summary: 'Pega uma conta referente ao id' })
  @TemplateApiException(() => [AccountNotFound])
  findOne(@Param('accountID') accountID: string) {
    return this.accountsService.findOneByAccountId(accountID);
  }

  @Get()
  @ApiOperation({ summary: 'Pega tudo' })
  getAll() {
    return this.accountsService.getAll();
  }
}
