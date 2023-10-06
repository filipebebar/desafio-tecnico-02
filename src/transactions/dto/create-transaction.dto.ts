import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  forma_pagamento: EPaymentOrder;

  @ApiProperty()
  conta_id: String;

  @ApiProperty()
  @IsPositive()
  valor: Number;
}

export class TransactionDto {
  accountId: String;
  paymentForm: EPaymentOrder;
  value: Number;
}

export class CreateTransactionResponse {
  @ApiResponseProperty()
  conta_id: String;
  @ApiResponseProperty()
  saldo: Number;
}

export interface ICreateTransaction {
  forma_pagamento: String;
  conta_id: String;
  valor: Number;
}

export enum EPaymentOrder {
  PIX = 'P',
  CREDIT_CARD = 'C',
  DEBIT_CARD = 'D',
}
