import { MongoDBException } from '../../utils/exceptions/exceptions';
import { ERROS } from '../../utils/errors/errors';

export class ExistsAccountsException extends MongoDBException {
  constructor() {
    super(ERROS.MONGO_DB.EXISTS_ACCOUNT_EXCEPTION, ERROS.MONGO_DB.EXISTS_ACCOUNT_EXCEPTION.statusCode);
  }
}

export class AccountNotFound extends MongoDBException {
  constructor() {
    super(ERROS.MONGO_DB.NOT_FOUND_EXCEPTION, ERROS.MONGO_DB.NOT_FOUND_EXCEPTION.statusCode);
  }
}
