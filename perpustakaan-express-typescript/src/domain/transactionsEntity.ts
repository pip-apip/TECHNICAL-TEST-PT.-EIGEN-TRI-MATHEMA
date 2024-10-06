export class Transaction {
    constructor(
      public id_transaction: number,
      public member_code: string,
      public book_code: string,
      public borrowed_date: Date,
      public return_date: Date
    ) {}
  }
  