import mongoose from 'mongoose';
import { TransactionModel } from '../model/schema/transactionSchema';
import { Transaction } from '../model/types/transaction';
import { PersonService } from './person.service';
import { Status } from '../model/types/person';

export class TransactionService {
  
    static async  get(startDate: Date, endDate: Date) {
   return await TransactionModel.find({
    date: { $gte: startDate.getTime(), $lte: endDate.getTime() },
    status: { $ne: Status.PENDING }
  }).select('id date Comments').then(res => res).catch(err => {throw err});
  }
  static async  update(transaction: Transaction) {
    return TransactionModel.updateOne({id: transaction.id}, {comments: transaction.Comments}).then(result => {
        return result;
    }).catch(err =>{ throw err});
  }
  static async create(transaction: Transaction) {
    let sender  = await PersonService.savePerson(transaction.sender);
    let recipient = await PersonService.savePerson(transaction.recipient);
    let updated: any = {};

    Object.entries(transaction).map(([key, value]) => {
        switch (key) {
            case 'date':
                updated[key] = new Date(value).getTime();
                break;
            case 'sender':
                updated[key] = sender._id;
                break;
            case 'recipient':
                updated[key] = recipient._id;
                break;
            default:
                updated[key] = value;
        }
    });
    return await TransactionModel.create(updated).then(result => {
        return result;
    }).catch(err =>{ throw err});
  }
}