type UserProps = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  email: string;
  monthlySalary: number;
  username: string;
  currency: string;
  phone: string;
  savingsTarget: number;
  savingsRate?: number;
  currentSavings?: number
};

type OutgoingRecord = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  item: string;
  currency: string;
  userId: number;
  tag: string;
  cost: number;
};

type ExpenseProps = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  item: string;
  cost: number;
  currency: string;
  tag: string;
  dateSpent: Date;
  userId: number;
};

export type { UserProps, OutgoingRecord, ExpenseProps };
