import { MongoDBException } from '../../utils/exceptions/exceptions';
import { ERROS } from '../../utils/errors/errors';

export class AccountNotFound extends MongoDBException {
  constructor() {
    super(ERROS.MONGO_DB.NOT_FOUND_EXCEPTION, ERROS.MONGO_DB.NOT_FOUND_EXCEPTION.statusCode);
  }
}
export class InvalidPaymentForm extends MongoDBException {
  constructor() {
    super(ERROS.MONGO_DB.INVALID_PAYMENT_FORM, ERROS.MONGO_DB.INVALID_PAYMENT_FORM.statusCode);
  }
}
