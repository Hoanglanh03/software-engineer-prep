import { create } from "zustand";
import type { Expense } from "../types";
import axiosClient from "../api/axiosClient";

// Assuming a base URL for the API
const API_URL = "/expenses";

type ApiExpense = {
  id: number;
  title: string;
  amount: string | number;
  type: "income" | "expense" | string;
  category: string | null;
  note: string | null;
  user_id: number | null;
  created_at: string | null;
  updated_at: string | null;
};

function mapApiExpense(e: ApiExpense): Expense {
  return {
    id: String(e.id),
    title: e.title,
    note: e.note ?? "",
    amount: typeof e.amount === "string" ? Number(e.amount) : e.amount,
    type: e.type === "income" ? "income" : "expense",
    category: e.category ?? "Default",
    createdAt: e.created_at ?? new Date().toISOString(),
    updatedAt: e.updated_at ?? undefined,
    userId: String(e.user_id ?? ""),
  };
}

type CreateExpensePayload = {
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  note: string;
};

interface ExpenseState {
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
}

interface ExpenseActions {
  fetchExpenses: () => Promise<void>;
  setExpenses: (expenses: Expense[]) => void;
  addExpense: (expense: CreateExpensePayload) => Promise<void>;
  updateExpense: (id: string, updates: CreateExpensePayload) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState & ExpenseActions>((set) => ({
  expenses: [],
  isLoading: false,
  error: null,

  setExpenses: (expenses) => set({ expenses }),

  fetchExpenses: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosClient.get<ApiExpense[]>(API_URL);
      set({
        expenses: Array.isArray(response.data) ? response.data.map(mapApiExpense) : [],
        isLoading: false,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message, isLoading: false });
      } else {
        set({ error: "Failed to add expense", isLoading: false });
      }
    }
  },

  addExpense: async (expenseData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosClient.post<ApiExpense>(API_URL, expenseData);
      set((state) => ({
        expenses: [mapApiExpense(response.data), ...state.expenses],
        isLoading: false,
      }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message, isLoading: false });
      } else {
        set({ error: "Failed to add expense", isLoading: false });
      }
    }
  },

  updateExpense: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosClient.put<ApiExpense>(`${API_URL}/${id}`, updates);
      set((state) => ({
        expenses: state.expenses.map((exp) =>
          exp.id === id ? mapApiExpense(response.data) : exp,
        ),
        isLoading: false,
      }));
    } catch (err: unknown) {
      set({
        error: err instanceof Error ? err.message : "Failed to update expense",
        isLoading: false,
      });
    }
  },

  deleteExpense: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosClient.delete(`${API_URL}/${id}`);
      set((state) => ({
        expenses: state.expenses.filter((exp) => exp.id !== id),
        isLoading: false,
      }));
    } catch (err: unknown) {
      set({
        error: err instanceof Error ? err.message : "Failed to delete expense",
        isLoading: false,
      });
    }
  },
}));
