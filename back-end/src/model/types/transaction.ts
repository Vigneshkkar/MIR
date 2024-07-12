import { Person, Status } from "./person";


export class Transaction {
    id!: number;
    date!: Date;
    Comments!: string;
    sender!: Person;
    recipient!: Person;
    amount: number=0;
    CurrencyCd: string = '';
    status: Status | undefined;
  }
 