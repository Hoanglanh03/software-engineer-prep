import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Coffee,
  Car,
  Home,
  Utensils,
  Zap,
  Heart,
  Smartphone,
  CreditCard,
} from "lucide-react";
import { useExpenseStore } from "../stores/useExpenseStore";
import type { Expense } from "../types";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().positive("Amount must be positive"),
  type: z.enum(["expense", "income"]),
  category: z.string().min(1, "Category is required"),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const categories = [
  { name: "Shopping", icon: <ShoppingBag className="h-4 w-4" /> },
  { name: "Food", icon: <Utensils className="h-4 w-4" /> },
  { name: "Coffee", icon: <Coffee className="h-4 w-4" /> },
  { name: "Transport", icon: <Car className="h-4 w-4" /> },
  { name: "Rent", icon: <Home className="h-4 w-4" /> },
  { name: "Utilities", icon: <Zap className="h-4 w-4" /> },
  { name: "Health", icon: <Heart className="h-4 w-4" /> },
  { name: "Tech", icon: <Smartphone className="h-4 w-4" /> },
  { name: "Salary", icon: <CreditCard className="h-4 w-4" /> },
  { name: "Freelance", icon: <CreditCard className="h-4 w-4" /> },
];

interface AddExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense?: Expense | null;
}

export default function AddExpenseModal({
  open,
  onOpenChange,
  expense = null,
}: AddExpenseModalProps) {
  const { addExpense, updateExpense, isLoading, fetchExpenses } = useExpenseStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: 0,
      type: "expense",
      category: "Food",
      note: "",
    },
  });

  React.useEffect(() => {
    if (!open) return;

    if (expense) {
      form.reset({
        title: expense.title,
        amount: expense.amount,
        type: expense.type,
        category: expense.category,
        note: expense.note ?? "",
      });
    } else {
      form.reset({
        title: "",
        amount: 0,
        type: "expense",
        category: "Food",
        note: "",
      });
    }
  }, [open, expense, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      if (expense) {
        await updateExpense(expense.id, {
          title: values.title,
          amount: values.amount,
          type: values.type,
          category: values.category,
          note: values.note || "",
        });
      } else {
        await addExpense({
          title: values.title,
          amount: values.amount,
          type: values.type,
          category: values.category,
          note: values.note || "",
        });
      }
      await fetchExpenses();
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {expense ? "Update Transaction" : "New Transaction"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pt-4"
          >
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-zinc-500">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Grocery shopping"
                      className="bg-zinc-50 border-zinc-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount Field */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormLabel className="text-zinc-500 uppercase text-[10px] font-bold tracking-widest">
                    Amount
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl font-bold text-zinc-400">
                        ₫
                      </span>
                      <Input
                        type="number"
                        placeholder="0"
                        className="text-4xl font-bold text-center border-none focus-visible:ring-0 h-16 p-0"
                        autoFocus
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Type Field */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold text-zinc-500">
                      Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full bg-zinc-50 border-zinc-200">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="expense">Chi tiêu</SelectItem>
                        <SelectItem value="income">Thu nhập</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category Field */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-zinc-500">
                    Category
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full bg-zinc-50 border-zinc-200">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.name} value={cat.name}>
                          <div className="flex items-center gap-2">
                            {cat.icon}
                            <span>{cat.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-zinc-500">
                    Note
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add a note..."
                      className="bg-zinc-50 border-zinc-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex-row gap-3 sm:gap-0">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="flex-1 text-zinc-500"
                >
                  Hủy
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="flex-1 bg-zinc-900 text-white hover:bg-zinc-800"
                disabled={isLoading}
              >
                {isLoading ? "Đang lưu..." : "Lưu Giao dịch"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
