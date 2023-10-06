import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
  accountId: String,
  balance: Number,
});
