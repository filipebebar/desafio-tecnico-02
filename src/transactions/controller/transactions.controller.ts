import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionsService } from '../service/transactions.service';
import { CreateTransactionDto, CreateTransactionResponse } from '../dto/create-transaction.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TemplateApiException } from '../../utils/swagger/template-api-exception';

@ApiTags('transacao')
@Controller('transacao')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiBody({ type: CreateTransactionDto })
  @ApiOperation({ summary: 'Realiza operações de pagamento' })
  @TemplateApiException(() => [])
  create(@Body() createTransactionDto: CreateTransactionDto): Promise<CreateTransactionResponse | any> {
    return this.transactionsService.createTransaction(createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Pega tudo' })
  getAll() {
    return this.transactionsService.getAll();
  }
}
