import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
  accountID: String,
  balance: Number,
});
