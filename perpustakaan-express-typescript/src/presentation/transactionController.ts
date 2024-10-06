import express, { Request, Response } from 'express';
import { TransactionService } from '../application/transactionService';
import { Transaction } from '../domain/transactionsEntity';

const router = express.Router();
const transactionService = new TransactionService();

// router.get('/', async (req: Request, res: Response) => {
//   const books = await transactionService.getAllTransaction();
//   res.json(books);
// });

router.post('/borrow_books', async (req: Request, res: Response) => {
  const { member_code, book_code, borrowed_date, return_date } = req.body;
  const transaction = new Transaction(0, member_code, book_code, borrowed_date, return_date);
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

router.post('/return_books', async (req: Request, res: Response) => {
  const { member_code, book_code, borrowed_date, return_date } = req.body;
  const transaction = new Transaction(0, member_code, book_code, borrowed_date, return_date);
  try{
    const resultMessage = await transactionService.returnBook(transaction);
    if (resultMessage === "Book successfully borrowed") {
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
