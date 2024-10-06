import express, { Request, Response } from 'express';
import { MemberController } from './presentation/swagger/memberController';
import { BookController } from './presentation/swagger/bookController';
import { TransactionController } from './presentation/swagger/transactionController';
import bodyParser from 'body-parser';
import { setupSwagger } from './swagger';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/members', MemberController);
app.use('/books', BookController);
app.use('/transaction', TransactionController);

setupSwagger(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
