import { Transaction } from '../types/transaction';
import mongoose, { Schema } from 'mongoose';
import { Status } from '../types/person';

const TransactionSchema = new mongoose.Schema<Transaction>({
    id: {type: Number, required: true},
    date:  {type: Date, required: true},
    Comments:  {type: String, required: false},
    sender: { type: Schema.Types.ObjectId, ref: 'Person'},
    recipient:{ type: Schema.Types.ObjectId, ref: 'Person'},
    Amount:  {type: Number, get: (v: number) =>Number((v/100).toFixed(2)), set: (v:number) => v*100, required: true},
    CurrencyCd: {type: String, required: true},
    status:  {type: String,enum: Object.values(Status), default: Status.PENDING, required: false}
});

export const TransactionModel = mongoose.model<Transaction>('Transaction', TransactionSchema);