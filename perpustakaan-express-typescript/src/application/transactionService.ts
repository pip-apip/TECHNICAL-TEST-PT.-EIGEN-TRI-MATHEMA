import { RowDataPacket } from 'mysql2';
import { db } from "../infrastructure/database";
import { Transaction } from "../domain/transactionsEntity";

export class TransactionService {
  
  async borrowBook(transaction: Transaction): Promise<string> {
      const [book_stock] = await db.query<Array<RowDataPacket>>(
          "SELECT stock FROM books WHERE code = ?", [transaction.book_code]
      );
      const [member_count] = await db.query<Array<RowDataPacket>>(
          "SELECT COUNT(member_code) AS count_member FROM transactions WHERE member_code = ? AND return_date IS NULL", [transaction.member_code]
      );
      const [penalty_check] = await db.query<Array<RowDataPacket>>(
          "SELECT * FROM penalty_list WHERE member_code = ?", [transaction.member_code]
      );

      if (penalty_check.length > 0) {
          const penaltyDate = new Date(penalty_check[0].date);
          const borrowDate = new Date(transaction.borrowed_date);

          const diffTime = borrowDate.getTime() - penaltyDate.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays >= 3) {
              await db.query("DELETE FROM penalty_list WHERE id_penalty = ?", [penalty_check[0].id_penalty]);

              if (member_count[0].count_member < 2) {
                  if (book_stock.length > 0 && book_stock[0].stock > 0) {
                      await db.query("INSERT INTO transactions (member_code, book_code, borrowed_date) VALUES (?, ?, ?)", [transaction.member_code, transaction.book_code, transaction.borrowed_date]);
                      await db.query("UPDATE books SET stock = stock - 1 WHERE code = ?", [transaction.book_code]);
                      return "Book successfully borrowed";
                  } else {
                      return "There are not enough books in stock for loan";
                  }
              } else {
                  return "This member has already borrowed 2 books";
              }
          } else {
              return "This member is still serving a penalty period";
          }
      }

      if (member_count[0].count_member < 2) {
          if (book_stock.length > 0 && book_stock[0].stock > 0) {
              await db.query("INSERT INTO transactions (member_code, book_code, borrowed_date) VALUES (?, ?, ?)", [transaction.member_code, transaction.book_code, transaction.borrowed_date]);
              await db.query("UPDATE books SET stock = stock - 1 WHERE code = ?", [transaction.book_code]);
              return "Book successfully borrowed";
          } else {
              return "There are not enough books in stock for loan";
          }
      } else {
          return "This member has already borrowed 2 books";
      }
  }


  async returnBook(transaction: Transaction): Promise<string> {
    const [find_transaction] = await db.query<Array<RowDataPacket>>(
      "SELECT * FROM transactions  WHERE member_code=? AND book_code=?", [transaction.member_code, transaction.book_code]
    );
    
    if(find_transaction.length > 0){
      await db.query("UPDATE transactions SET return_date =? WHERE member_code=? AND book_code=?", [transaction.return_date, transaction.member_code, transaction.book_code]);
      const borrowedDate = new Date(find_transaction[0].borrowed_date);
      const returnDate = new Date(transaction.return_date);
      
      const diffTime = returnDate.getTime() - borrowedDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // console.log('Selisih waktu peminjaman: '+diffDays+' hari');

      if(diffDays > 7){
        await db.query("INSERT INTO penalty_list (member_code, date) VALUES (?, ?)", [transaction.member_code, transaction.return_date]);
      }
  
      await db.query("UPDATE books SET stock = stock + 1 WHERE code = ?", [transaction.book_code]);
      return "Book success returned";
    }else{
      return "Transaction not found";
    }
  }
}
