import express, { Request, Response } from 'express';
import { BookService } from '../application/bookService';
import { Books } from '../domain/booksEntity';

const router = express.Router();
const bookService = new BookService();

router.get('/', async (req: Request, res: Response) => {
  const books = await bookService.getAllBook();
  res.json(books);
});

router.post('/', async (req: Request, res: Response) => {
  const { code, title, author, stock } = req.body;
  const book = new Books(code, title, author, stock);
  await bookService.createBook(book);
  res.status(201).json({ message: "Book created" });  
});

router.put('/:code', async (req: Request, res: Response) => {
  const { code } = req.params;
  const { title, author, stock } = req.body;
  const book = new Books(code, title, author, stock);
  await bookService.updateBook(code, book);
  res.json({ message: "Book updated" });
});

router.delete('/:code', async (req: Request, res: Response) => {
  const { code } = req.params;
  await bookService.deleteBook(code);
  res.json({ message: "Book deleted" });
});

export { router as BookController };
