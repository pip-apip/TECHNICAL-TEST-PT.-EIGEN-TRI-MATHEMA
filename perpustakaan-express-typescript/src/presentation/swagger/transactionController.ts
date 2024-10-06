import express, { Request, Response } from 'express';
import { TransactionService } from '../../application/transactionService';
import { Transaction } from '../../domain/transactionsEntity';

const router = express.Router();
const transactionService = new TransactionService();

/**
 * @swagger
 * /transaction/borrow_books:
 *   post:
 *     summary: to Borrow books
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_code:
 *                 type: string
 *               book_code:
 *                 type: string
 *               borrowed_date:
 *                 type: string
 *                 format: date
 *                 description: The member's date of birth in YYYY-MM-DD format
 *     responses:
 *       201:
 *         description: Book successfully borrowed
 */
router.post('/borrow_books', async (req: Request, res: Response) => {
  const { member_code, book_code, borrowed_date, return_date } = req.body;
  const transaction = new Transaction(0, member_code, book_code, borrowed_date, return_date);
  console.log(transaction);
  try {
    const resultMessage = await transactionService.borrowBook(transaction);
    
    if (resultMessage === "Book successfully borrowed") {
        res.status(201).json({ message: resultMessage });
    } else {
        res.status(400).json({ message: resultMessage });
    }

  } catch (error) {

    if (error instanceof Error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    } else {
        res.status(500).json({ message: "An error occurred", error: "Unknown error" });
    }
  }
  // await transactionService.borrowBook(transaction);
  // res.status(201).json({ message: "Book success to borrow" });  
});

/**
 * @swagger
 * /transaction/return_books:
 *   post:
 *     summary: to Return books
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_code:
 *                 type: string
 *               book_code:
 *                 type: string
 *               return_date:
 *                 type: string
 *                 format: date
 *                 description: The member's date of birth in YYYY-MM-DD format
 *     responses:
 *       201:
 *         description: Book successfully returned
 */
router.post('/return_books', async (req: Request, res: Response) => {
  const { member_code, book_code, borrowed_date, return_date } = req.body;
  const transaction = new Transaction(0, member_code, book_code, borrowed_date, return_date);
  try{
    const resultMessage = await transactionService.returnBook(transaction);
    if (resultMessage === "Book successfully returned") {
      res.status(201).json({ message: resultMessage });
    } else {
      res.status(400).json({ message: resultMessage });
    }
  }catch(error){
    if (error instanceof Error) {
      res.status(500).json({ message: "An error occurred", error: error.message });
    } else {
      res.status(500).json({ message: "An error occurred", error: "Unknown error" });
    }
  }
});

export { router as TransactionController };
