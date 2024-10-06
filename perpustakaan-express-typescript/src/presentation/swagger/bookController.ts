import express, { Request, Response } from 'express';
import { BookService } from '../../application/bookService';
import { Books } from '../../domain/booksEntity';

const router = express.Router();
const bookService = new BookService();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books available to borrow
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 */
router.get('/', async (req: Request, res: Response) => {
  const books = await bookService.getAllBook();
  res.json(books);
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Book created
 */
router.post('/', async (req: Request, res: Response) => {
  const { code, title, author, stock } = req.body;
  const book = new Books(code, title, author, stock);
  await bookService.createBook(book);
  res.status(201).json({ message: "Book created" });  
});

/**
 * @swagger
 * /books/{code}:
 *   put:
 *     summary: Edit book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The book code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: book updated
 */
router.put('/:code', async (req: Request, res: Response) => {
  const { code } = req.params;
  const { title, author, stock } = req.body;
  const book = new Books(code, title, author, stock);
  await bookService.updateBook(code, book);
  res.json({ message: "Book updated" });
});

/**
 * @swagger
 * /books/{code}:
 *   delete:
 *     summary: Delete book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The book code
 *     responses:
 *       201:
 *         description: Book deleted
 */
router.delete('/:code', async (req: Request, res: Response) => {
  const { code } = req.params;
  await bookService.deleteBook(code);
  res.json({ message: "Book deleted" });
});

export { router as BookController };
