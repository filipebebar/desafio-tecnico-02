import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { AccountsService } from '../service/accounts.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TemplateApiException } from '../../utils/swagger/template-api-exception';
import { AccountNotFound, ExistsAccountsException } from '../exception/accounts.exception';
import { AccountRequest, AccountResponse } from '../dto/account.dto';

@ApiTags('conta')
@Controller('conta')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post(':accountId')
  @ApiBody({ type: AccountRequest })
  @ApiOperation({ summary: 'Cria uma nova conta' })
  @TemplateApiException(() => [ExistsAccountsException])
  create(@Body() accountRequest: AccountRequest): Promise<HttpStatus> {
    return this.accountsService.createAccount(accountRequest, true);
  }

  @Get(':accountId')
  @ApiOperation({ summary: 'Pega uma conta existente referente ao número de conta informado' })
  @TemplateApiException(() => [AccountNotFound])
  findOne(@Param('accountId') accountId: string): Promise<AccountNotFound | AccountResponse> {
    return this.accountsService.findOneByAccountId(accountId, false);
  }
}
