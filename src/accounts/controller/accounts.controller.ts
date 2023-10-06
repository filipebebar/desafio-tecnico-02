import { Controller, Get, Param, Post } from '@nestjs/common';
import { AccountsService } from '../service/accounts.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TemplateApiException } from '../../utils/swagger/template-api-exception';
import { AccountNotFound, ExistsAccountsException } from '../exception/accounts.exception';

@ApiTags('conta')
@Controller('conta')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post(':accountId')
  @ApiOperation({ summary: 'Cria uma nova conta' })
  @TemplateApiException(() => [ExistsAccountsException])
  create(@Param('accountId') accountId: string) {
    return this.accountsService.create(accountId, true);
  }

  @Get(':accountId')
  @ApiOperation({ summary: 'Pega uma conta existente referente ao número de conta informado' })
  @TemplateApiException(() => [AccountNotFound])
  findOne(@Param('accountId') accountId: string) {
    return this.accountsService.findOneByAccountId(accountId, false);
  }

  @Get()
  @ApiOperation({ summary: 'Pega tudo' })
  getAll() {
    return this.accountsService.getAll();
  }
}
