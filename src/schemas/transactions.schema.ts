import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EPaymentOrder } from '../transactions/dto/create-transaction.dto';

@Schema()
export class Transaction {
  @Prop({ required: true })
  accountId: String;

  @Prop()
  paymentForm: EPaymentOrder;

  @Prop()
  value: Number;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
