import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionsDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accumulator: Balance, typeTransaction: Transaction) => {
        if (typeTransaction.type === 'income') {
          accumulator.income += typeTransaction.value;
        } else if (typeTransaction.type === 'outcome') {
          accumulator.outcome += typeTransaction.value;
        }
        accumulator.total = accumulator.income - accumulator.outcome;
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return balance;
  }

  public create({ title, value, type }: CreateTransactionsDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    // const { total } = this.getBalance();
    // if (type === 'outcome' && total - value < 0) {
    //   throw Error('Outcome  value not allowed. More than total2');
    // }

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
