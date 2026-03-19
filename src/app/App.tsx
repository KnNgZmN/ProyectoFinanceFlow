import { useState, useEffect } from 'react';
import { Wallet, Moon, Sun, Filter as FilterIcon, Search as SearchIcon, BarChart2, Target, Home, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatCurrency } from './utils/currency';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Transaction } from './components/TransactionList';
import { Toast, ToastMessage } from './components/Toast';
import { QuickAddModal } from './components/QuickAddModal';
import { BottomNav } from './components/BottomNav';
import { FinancialHealth } from './components/FinancialHealth';
import { GoalsView } from './components/GoalsView';
import { Achievements } from './components/Achievements';
import { DateFilter } from './components/DateFilter';
import { KPICard } from './components/KPICard';
import { ExpenseChart } from './components/ExpenseChart';
import { TransactionList } from './components/TransactionList';
import { GlobalSearch } from './components/GlobalSearch';
import { Breadcrumbs, useBreadcrumbs } from './components/Breadcrumbs';
import { HelpPanel } from './components/HelpPanel';

const navItems = [
  { id: 'home', label: 'Inicio', icon: Home },
  { id: 'stats', label: 'Análisis', icon: BarChart2 },
  { id: 'goals', label: 'Metas', icon: Target },
];

function AppContent() {
  const { isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('home');
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const breadcrumbs = useBreadcrumbs(activeTab);

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', description: 'Salario mensual', amount: 3500000, category: 'Salario', date: '2026-02-01', type: 'income' },
    { id: '2', description: 'Supermercado', amount: 250500, category: 'Alimentación', date: '2026-02-15', type: 'expense' },
    { id: '3', description: 'Netflix', amount: 15990, category: 'Entretenimiento', date: '2026-02-10', type: 'expense' },
    { id: '4', description: 'Uber', amount: 32500, category: 'Transporte', date: '2026-02-20', type: 'expense' },
    { id: '5', description: 'Compras online', amount: 89990, category: 'Compras', date: '2026-02-22', type: 'expense' },
    { id: '6', description: 'Luz', amount: 65000, category: 'Servicios', date: '2026-02-25', type: 'expense' },
    { id: '7', description: 'Restaurante', amount: 45000, category: 'Alimentación', date: '2026-02-26', type: 'expense' },
  ]);

  const chartData = [
    { month: 'Ago', gastos: 1200000, ingresos: 3500000 },
    { month: 'Sep', gastos: 1450000, ingresos: 3500000 },
    { month: 'Oct', gastos: 1100000, ingresos: 3500000 },
    { month: 'Nov', gastos: 1800000, ingresos: 3500000 },
    { month: 'Dic', gastos: 2200000, ingresos: 4000000 },
    { month: 'Ene', gastos: 1350000, ingresos: 3500000 },
    { month: 'Feb', gastos: 1500000, ingresos: 3500000 },
  ];

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpenses;
  const budgetLimit = 2000000;

  const addToast = (type: ToastMessage['type'], message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => dismissToast(id), 4000);
  };

  const dismissToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  const handleQuickAdd = async (transaction: Omit<Transaction, 'id' | 'date'>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
    };
    setTransactions(prev => [newTransaction, ...prev]);
    addToast('success', `${transaction.type === 'income' ? '💰' : '💸'} ${formatCurrency(transaction.amount)} agregado`);
    if (transaction.type === 'expense' && totalExpenses + transaction.amount > budgetLimit) {
      addToast('error', '⚠️ Presupuesto excedido');
    }
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    addToast('info', 'Transacción eliminada');
  };

  const handleNavigate = (tab: string) => setActiveTab(tab);

  useEffect(() => { addToast('info', '¡Hola Inge! Gestiona tus finanzas fácilmente 👋'); }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') { e.preventDefault(); setIsQuickAddOpen(true); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setIsSearchOpen(true); }
      if (e.key === 'Escape') { setIsSearchOpen(false); setIsQuickAddOpen(false); setIsFilterOpen(false); }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950 transition-colors">

      {/* ── Mobile Header ── */}
      <header className="lg:hidden sticky top-0 z-30 bg-slate-100/90 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-md shadow-blue-500/30">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">FinanceFlow</h1>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Gestión inteligente</p>
            </div>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-1">
            <button onClick={() => setIsSearchOpen(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors" aria-label="Buscar">
              <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <button onClick={() => setIsFilterOpen(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors" aria-label="Filtrar">
              <FilterIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <button onClick={toggleTheme} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors" aria-label="Cambiar tema">
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-500" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Desktop Header ── */}
      <header className="hidden lg:block sticky top-0 z-30 bg-slate-100/90 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-0">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <div className="flex items-center gap-2.5 min-w-[200px]">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl shadow-md shadow-blue-500/30">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900 dark:text-white tracking-tight leading-none">FinanceFlow</h1>
                <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Finanzas personales</p>
              </div>
            </div>

            {/* Nav tabs — pill style */}
            <nav className="flex items-center gap-0.5 bg-gray-100/80 dark:bg-gray-800/80 rounded-2xl p-1 backdrop-blur-sm absolute left-1/2 -translate-x-1/2">
              {navItems.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 tracking-tight ${isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-white dark:bg-gray-700 rounded-xl shadow-sm"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                <SearchIcon className="w-4 h-4" />
                <span className="hidden xl:inline tracking-tight">Buscar</span>
                <kbd className="hidden xl:inline px-1.5 py-0.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-md text-xs font-mono text-gray-400">
                  ⌘K
                </kbd>
              </button>

              {/* Filter */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                aria-label="Filtrar"
              >
                <FilterIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                aria-label="Cambiar tema"
              >
                {isDark
                  ? <Sun className="w-5 h-5 text-yellow-400" />
                  : <Moon className="w-5 h-5 text-gray-500" />}
              </button>

              {/* Divider */}
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

              {/* CTA */}
              <button
                onClick={() => setIsQuickAddOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-xl font-semibold text-sm tracking-tight shadow-md shadow-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                Nueva
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-[1600px] mx-auto px-4 lg:px-8 py-4 lg:py-8">
        <div className="hidden lg:block">
          <Breadcrumbs items={breadcrumbs} onNavigate={handleNavigate} />
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4 lg:space-y-6">
              <div className="lg:hidden mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Panel de Control</h2>
                <p className="text-sm font-medium text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wide">Resumen de tu actividad financiera</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <KPICard title="Balance" value={formatCurrency(balance)} change={12.5} icon={Wallet} color="bg-blue-600" tooltip="Balance total del mes" />
                <KPICard title="Ingresos" value={formatCurrency(totalIncome)} change={8.3} icon={Wallet} color="bg-green-600" tooltip="Total de ingresos" />
                <KPICard title="Gastos" value={formatCurrency(totalExpenses)} change={-5.2} icon={Wallet} color={totalExpenses > budgetLimit ? 'bg-red-600' : 'bg-orange-600'} tooltip="Total de gastos" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch">
                <div className="lg:col-span-2 flex"><div className="w-full"><ExpenseChart data={chartData} /></div></div>
                <div className="flex"><div className="w-full"><FinancialHealth totalIncome={totalIncome} totalExpenses={totalExpenses} budgetLimit={budgetLimit} /></div></div>
              </div>

              <TransactionList transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div key="stats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="lg:hidden mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Análisis y Logros</h2>
                <p className="text-sm font-medium text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wide">Desbloquea logros y mejora tus hábitos</p>
              </div>
              <Achievements />
            </motion.div>
          )}

          {activeTab === 'goals' && (
            <motion.div key="goals" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="lg:hidden mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Metas de Ahorro</h2>
                <p className="text-sm font-medium text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wide">Define y alcanza tus objetivos financieros</p>
              </div>
              <GoalsView totalIncome={totalIncome} totalExpenses={totalExpenses} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} onQuickAdd={() => setIsQuickAddOpen(true)} />

      {/* Modals */}
      <QuickAddModal isOpen={isQuickAddOpen} onClose={() => setIsQuickAddOpen(false)} onAdd={handleQuickAdd} />
      {isFilterOpen && <DateFilter transactions={transactions} onClose={() => setIsFilterOpen(false)} />}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} transactions={transactions} onNavigate={handleNavigate} />
      <HelpPanel section={activeTab as any} />
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default function App() {
  return <ThemeProvider><AppContent /></ThemeProvider>;
}