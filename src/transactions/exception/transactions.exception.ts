import { MongoDBException } from '../../utils/exceptions/exceptions';
import { ERROS } from '../../utils/errors/errors';

export class AccountNotFound extends MongoDBException {
  constructor() {
    super(ERROS.MONGO_DB.NOT_FOUND_EXCEPTION, ERROS.MONGO_DB.NOT_FOUND_EXCEPTION.statusCode);
  }
}
