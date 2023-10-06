import { HttpStatus } from '@nestjs/common';

export const ERROS = {
  MONGO_DB: {
    EXISTS_ACCOUNT_EXCEPTION: {
      code: 1000,
      message: 'Já existe uma conta com esse número!',
      statusCode: HttpStatus.CONFLICT,
    },
    NOT_FOUND_EXCEPTION: {
      code: 1001,
      message: 'Nenhuma conta foi encontrada!',
      statusCode: HttpStatus.NOT_FOUND,
    },
    EXCEEDS_AVAILABLE_VALUE: {
      code: 1002,
      message: 'Transação ultrapasa saldo da conta!',
      statusCode: HttpStatus.NOT_FOUND,
    },
    INVALID_PAYMENT_FORM: {
      code: 1003,
      message: 'Forma de pagamento inválida!!',
      statusCode: HttpStatus.NOT_ACCEPTABLE,
    },
  },
};
