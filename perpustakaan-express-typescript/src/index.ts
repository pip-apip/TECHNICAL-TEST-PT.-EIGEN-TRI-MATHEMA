import express, { Request, Response } from 'express';
import { MemberController } from './presentation/memberController';
import { BookController } from './presentation/bookController';
import { TransactionController } from './presentation/transactionController';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/members', MemberController);
app.use('/books', BookController);
app.use('/transaction', TransactionController);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
