export interface Person {
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    IDNumber: number,
    email: string,
    accountNumber: number,
    bank: string,
  }

  export enum Status {
    PENDING,
    COMPLETED, 
    INPROGRESS,
    REJECTED
  }