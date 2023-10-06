import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class AccountDto {
  @ApiProperty()
  accountId: String;
  @ApiProperty()
  balance: Number;
}

export class AccountResponse {
  @ApiResponseProperty()
  accountId: String;
  @ApiResponseProperty()
  balance: Number;
}

export interface IAccount {
  accountId: String;
  balance: Number;
}
