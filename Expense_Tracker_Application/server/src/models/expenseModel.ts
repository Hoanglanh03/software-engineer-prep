export interface Expense {
  id: number | string;
  title: string;
  amount: number;
  type: string;
  category: string;
  note: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId: number;
}

export interface createExpenseDTO {
  title: string;
  amount: number;
  type: string;
  category: string;
  note: string;
  userId: number;
}
