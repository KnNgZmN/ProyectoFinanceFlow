import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ArrowUpRight, ArrowDownRight, Trash2, AlertCircle, Receipt } from 'lucide-react';
import { ConfirmDialog } from './ConfirmDialog';
import { EmptyState } from './EmptyState';
import { Tooltip } from './Tooltip';
import { formatCurrency } from '../utils/currency';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  isLoading?: boolean;
}

export function TransactionList({ transactions, onDeleteTransaction, isLoading = false }: TransactionListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const categories = ['all', ...Array.from(new Set(transactions.map(t => t.category)))];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteClick = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!transactionToDelete) return;
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onDeleteTransaction(transactionToDelete.id);
    setIsDeleting(false);
    setDeleteDialogOpen(false);
    setTransactionToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setTransactionToDelete(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="
        relative overflow-hidden rounded-2xl p-5 sm:p-6
        bg-gradient-to-br from-slate-50 to-indigo-50/40
        dark:bg-none dark:bg-gray-800/90
        border border-indigo-200 dark:border-indigo-500/30
        shadow-lg shadow-indigo-500/10 dark:shadow-black/40
        hover:shadow-xl transition-all duration-300
        backdrop-blur-sm
      "
    >
      {/* Decorative glow dark mode */}
      <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-0 dark:opacity-5 bg-gradient-to-br from-blue-500 to-purple-500 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6 relative">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/30">
            <Receipt className="w-5 h-5 text-white drop-shadow" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
              Transacciones Recientes
            </h2>
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mt-0.5">
              {filteredTransactions.length} {filteredTransactions.length === 1 ? 'transacción' : 'transacciones'}
              {searchTerm || categoryFilter !== 'all' ? ' encontradas' : ''}
            </p>
          </div>
        </div>

        {/* Limpiar filtros */}
        {(searchTerm || categoryFilter !== 'all') && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => { setSearchTerm(''); setCategoryFilter('all'); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/40 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors self-start sm:self-auto"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Limpiar filtros
          </motion.button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5 sm:mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar transacciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full pl-9 pr-4 py-2.5 text-sm
              bg-white/80 dark:bg-gray-900/60
              border border-gray-200 dark:border-gray-700
              rounded-xl
              text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-400/40
              focus:border-blue-400 dark:focus:border-blue-500
              transition-all backdrop-blur-sm
              font-medium tracking-tight
            "
            aria-label="Buscar transacciones"
          />
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded hidden sm:block"
            >
              {filteredTransactions.length} resultados
            </motion.div>
          )}
        </div>

        {/* Category filter */}
        <div className="relative w-full sm:w-56">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="
              w-full pl-9 pr-8 py-2.5 text-sm
              bg-white/80 dark:bg-gray-900/60
              border border-gray-200 dark:border-gray-700
              rounded-xl
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-400/40
              focus:border-blue-400 dark:focus:border-blue-500
              appearance-none cursor-pointer
              transition-all backdrop-blur-sm
              font-medium tracking-tight
            "
            aria-label="Filtrar por categoría"
          >
            <option value="all">Todas las categorías</option>
            {categories.filter(cat => cat !== 'all').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Transaction list */}
      {filteredTransactions.length === 0 && !isLoading ? (
        <EmptyState
          icon={Receipt}
          title={searchTerm || categoryFilter !== 'all' ? 'No se encontraron transacciones' : 'No hay transacciones'}
          description={
            searchTerm || categoryFilter !== 'all'
              ? 'Intenta ajustar los filtros para ver más resultados'
              : 'Comienza agregando tu primera transacción para llevar el control de tus finanzas'
          }
        />
      ) : (
        <div className="space-y-2 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-1">
          <AnimatePresence mode="popLayout">
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                transition={{ delay: index * 0.04 }}
                layout
                className="
                  flex items-center justify-between p-3 sm:p-4 rounded-xl
                  bg-white/80 dark:bg-gray-900/50
                  border border-gray-100 dark:border-gray-700/60
                  hover:border-blue-200 dark:hover:border-blue-700/40
                  hover:shadow-md hover:shadow-blue-500/5
                  dark:hover:shadow-black/20
                  transition-all duration-200 group
                  backdrop-blur-sm
                "
              >
                {/* Icon + info */}
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className={`
                    p-2 sm:p-2.5 rounded-xl flex-shrink-0
                    ${transaction.type === 'income'
                      ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-md shadow-green-500/30'
                      : 'bg-gradient-to-br from-red-400 to-red-600 shadow-md shadow-red-500/30'
                    }
                  `}>
                    {transaction.type === 'income'
                      ? <ArrowDownRight className="w-4 h-4 text-white" />
                      : <ArrowUpRight className="w-4 h-4 text-white" />
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate tracking-tight">
                      {transaction.description}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className="inline-flex items-center text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md tracking-tight">
                        {transaction.category}
                      </span>
                      <span className="text-xs text-gray-300 dark:text-gray-600 hidden sm:inline">•</span>
                      <span className="text-xs font-medium text-gray-400 dark:text-gray-500 tracking-tight">
                        {transaction.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount + delete */}
                <div className="flex items-center gap-2 sm:gap-3 ml-3 flex-shrink-0">
                  <p className={`
                    text-sm sm:text-base font-bold whitespace-nowrap tracking-tight
                    ${transaction.type === 'income'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-800 dark:text-gray-200'
                    }
                  `}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                  </p>

                  <Tooltip content="Eliminar transacción">
                    <button
                      onClick={() => handleDeleteClick(transaction)}
                      className="
                        opacity-0 group-hover:opacity-100
                        p-2 rounded-xl
                        hover:bg-red-50 dark:hover:bg-red-900/20
                        border border-transparent hover:border-red-200 dark:hover:border-red-800/50
                        transition-all duration-200
                      "
                      aria-label="Eliminar transacción"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
                    </button>
                  </Tooltip>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 opacity-60 dark:opacity-40" />

      {/* Confirm delete dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar transacción?"
        message={
          transactionToDelete
            ? `Estás por eliminar "${transactionToDelete.description}" por ${formatCurrency(transactionToDelete.amount)}. Esta acción no se puede deshacer.`
            : ''
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        isDestructive
        isProcessing={isDeleting}
      />
    </motion.div>
  );
}