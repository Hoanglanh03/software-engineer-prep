import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useExpenseStore } from '../stores/useExpenseStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatDate } from '@/utils/format';
import { 
  Plus, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  ShoppingBag, 
  Coffee, 
  Car, 
  Home, 
  Utensils, 
  Zap, 
  Heart, 
  Smartphone,
  CreditCard,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import AddExpenseModal from '../components/addExpenseModal';

const categoryIcons: Record<string, React.ReactNode> = {
  'Shopping': <ShoppingBag className="h-5 w-5" />,
  'Food': <Utensils className="h-5 w-5" />,
  'Coffee': <Coffee className="h-5 w-5" />,
  'Transport': <Car className="h-5 w-5" />,
  'Rent': <Home className="h-5 w-5" />,
  'Utilities': <Zap className="h-5 w-5" />,
  'Health': <Heart className="h-5 w-5" />,
  'Tech': <Smartphone className="h-5 w-5" />,
  'Salary': <CreditCard className="h-5 w-5" />,
  'Default': <CreditCard className="h-5 w-5" />
};

export default function MobileDashboard() {
  const { user, logout } = useAuthStore();
  const { expenses, isLoading, fetchExpenses } = useExpenseStore();
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = React.useState<string | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // Calculate totals
  const safeExpenses = Array.isArray(expenses) ? expenses : [];
  
  const totalBalance = safeExpenses.reduce((acc, curr) => 
    curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0
  );
  
  const totalReceipts = safeExpenses
    .filter(e => e.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const totalExpenses = safeExpenses
    .filter(e => e.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const recentTransactions = [...safeExpenses]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-zinc-50 pb-24">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex items-center justify-between bg-white border-b border-zinc-100">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-zinc-100">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-zinc-900 text-white text-xs">
              {user?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Welcome back,</h2>
            <h1 className="text-lg font-bold text-zinc-900">{user?.name || 'User'}!</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {user?.role === 'admin' && (
            <Link to="/admin">
              <Button variant="ghost" size="icon" className="rounded-full bg-zinc-100 text-zinc-900">
                <ShieldCheck className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-zinc-100 text-zinc-900"
            onClick={() => logout()}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="px-4 mt-6 space-y-6">
        {/* Balance Card */}
        <Card className="bg-zinc-900 text-white border-none shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Zap className="h-24 w-24" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-zinc-400 text-xs font-medium uppercase tracking-wider">
              Current total balance
            </CardTitle>
            <div className="text-3xl font-bold mt-1">
              {formatCurrency(totalBalance)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <ArrowUpCircle className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase font-semibold">Receipts</p>
                  <p className="text-sm font-bold text-blue-400">{formatCurrency(totalReceipts)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <ArrowDownCircle className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase font-semibold">Expenses</p>
                  <p className="text-sm font-bold text-red-400">{formatCurrency(totalExpenses)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction List */}
        <div>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-bold text-zinc-900">Recent Transactions</h3>
            <Button variant="link" className="text-xs text-zinc-500 p-0 h-auto">See all</Button>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-white rounded-xl border border-zinc-100">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))
            ) : recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="flex items-center gap-4 p-3 bg-white rounded-xl border border-zinc-100 shadow-sm active:scale-[0.98] transition-transform"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setSelectedExpenseId(transaction.id);
                    setIsAddModalOpen(true);
                  }}
                >
                  <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center",
                    transaction.type === 'income' ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"
                  )}>
                    {categoryIcons[transaction.category] || categoryIcons.Default}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-zinc-900 text-sm truncate">{transaction.title}</h4>
                    <p className="text-zinc-500 text-[10px] truncate">{transaction.note}</p>
                    <p className="text-zinc-400 text-[9px] mt-0.5">{formatDate(transaction.createdAt)}</p>
                  </div>

                  <div className={cn(
                    "font-bold text-sm",
                    transaction.type === 'income' ? "text-blue-600" : "text-red-600"
                  )}>
                    {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-zinc-200">
                <p className="text-zinc-400 text-sm">No transactions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <Button 
        size="icon" 
        onClick={() => setIsAddModalOpen(true)}
        className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-4 z-[60] h-14 w-14 rounded-full bg-zinc-900 text-white shadow-2xl hover:bg-zinc-800 active:scale-95 transition-all"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <AddExpenseModal
        open={isAddModalOpen}
        onOpenChange={(open) => {
          setIsAddModalOpen(open);
          if (!open) setSelectedExpenseId(null);
        }}
        expense={selectedExpenseId ? safeExpenses.find((e) => e.id === selectedExpenseId) ?? null : null}
      />
    </div>
  );
}
