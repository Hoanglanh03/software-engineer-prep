export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "admin" | "user";
  createdAt?: string;
  updatedAt?: string;
}
export interface Expense {
  id: string;
  type: "income" | "expense";
  title: string;
  note: string;
  amount: number;
  category: string;
  createdAt: string;
  userId: string;
  updatedAt?: string;
}

export type AuthLayoutProps = {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  alternateAction?: {
    text: string;
    linkText: string;
    href: string;
  };
};

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
