import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
  @Prop({ required: true, unique: true })
  accountId: String;

  @Prop()
  balance: Number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
