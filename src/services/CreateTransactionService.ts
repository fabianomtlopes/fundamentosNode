import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.total - value < 0) {
      throw Error('Outcome  value not allowed. More than total');
    }

    const transactions = this.transactionsRepository.create({
      title,
      type,
      value,
    });
    return transactions;
  }
}

export default CreateTransactionService;
