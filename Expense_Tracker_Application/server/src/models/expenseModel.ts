export interface Expense {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  date: Date;
  note: string;
}

export interface createExpenseDTO {
  title: string;
  amount: number;
  type: string;
  category: string;
  date: Date;
  note: string;
}
