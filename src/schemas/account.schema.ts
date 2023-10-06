import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
  @Prop()
  accountId: String;

  @Prop()
  balance: Number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
