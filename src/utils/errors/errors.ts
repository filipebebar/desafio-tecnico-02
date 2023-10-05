import { ExistsAccountsException } from '../../accounts/exception/accounts.exception';
import { HttpStatus } from '@nestjs/common';

export const ERROS = {
  MONGO_DB: {
    EXISTS_ACCOUNT_EXCEPTION: {
      code: 1000,
      message: 'Já existe uma acconta com esse número!',
      statusCode: HttpStatus.BAD_REQUEST,
    },
    NOT_FOUND_EXCEPTION: {
      code: 1001,
      message: 'Nenhuma conta foi encontrada!',
      statusCode: HttpStatus.NOT_FOUND,
    },
  },
};
