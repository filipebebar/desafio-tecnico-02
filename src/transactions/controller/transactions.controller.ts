import { Body, Controller, Post } from '@nestjs/common';
import { TransactionsService } from '../service/transactions.service';
import { CreateTransactionDto, CreateTransactionResponse } from '../dto/create-transaction.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TemplateApiException } from '../../utils/swagger/template-api-exception';
import { AccountNotFound } from '../exception/transactions.exception';

@ApiTags('transacao')
@Controller('transacao')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiBody({ type: CreateTransactionDto })
  @ApiOperation({ summary: 'Realiza operações de pagamento' })
  @TemplateApiException(() => [AccountNotFound])
  create(@Body() createTransactionDto: CreateTransactionDto): Promise<CreateTransactionResponse | AccountNotFound> {
    return this.transactionsService.createTransaction(createTransactionDto);
  }
}
