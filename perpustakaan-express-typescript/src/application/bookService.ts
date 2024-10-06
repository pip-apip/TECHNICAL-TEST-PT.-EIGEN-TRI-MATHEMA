import { db } from "../infrastructure/database";
import { Books } from "../domain/booksEntity";

export class BookService {
  async getAllBook(): Promise<Books[]> {
    const [rows] = await db.query("SELECT * FROM books WHERE stock != 0");
    return rows as Books[];
  }

  async createBook(book: Books): Promise<void> {
    await db.query("INSERT INTO books (code, title, author, stock) VALUES (?, ?, ?, ?)", [book.code, book.title, book.author, book.stock]);
  }

  async updateBook(code: string, book: Books): Promise<void> {
    await db.query("UPDATE books SET title=?, author=?, stock=?  WHERE code=?", [book.title, book.author, book.stock, code]);
  }

  async deleteBook(code: string): Promise<void> {
    await db.query("DELETE FROM books WHERE code=?", [code]);
  }
}
