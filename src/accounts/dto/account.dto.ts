import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class AccountDto {
  accountId: String;
  balance: Number;
}

export class AccountResponse {
  @ApiResponseProperty()
  accountId: String;
  @ApiResponseProperty()
  balance: Number;
}

export class AccountRequest {
  @ApiProperty()
  accountId: String;
  @ApiProperty()
  value: number;
}
