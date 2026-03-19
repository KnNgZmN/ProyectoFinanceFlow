import { motion } from 'motion/react';
import { PieChart, DollarSign, Target, TrendingUp, Calendar } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

interface SidebarStatsProps {
  totalIncome: number;
  totalExpenses: number;
  budgetLimit: number;
  transactionCount: number;
}

export function Sidebar({ totalIncome, totalExpenses, budgetLimit, transactionCount }: SidebarStatsProps) {
  const budgetUsed = (totalExpenses / budgetLimit) * 100;
  const avgExpensePerDay = totalExpenses / 27; // Feb 27

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
          <PieChart className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          <span className="truncate">Estadísticas Rápidas</span>
        </h3>
        
        <div className="space-y-3 sm:space-y-4">
          {/* Budget Usage */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm text-gray-600">Presupuesto usado</span>
              <span className="text-xs sm:text-sm font-medium">{budgetUsed.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(budgetUsed, 100)}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full rounded-full ${
                  budgetUsed > 100 ? 'bg-red-500' : budgetUsed > 80 ? 'bg-orange-500' : 'bg-blue-500'
                }`}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {formatCurrency(totalExpenses)} de {formatCurrency(budgetLimit)}
            </p>
          </div>

          {/* Avg Daily Expense */}
          <div className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-600 truncate">Gasto diario promedio</span>
            </div>
            <span className="text-xs sm:text-sm font-medium whitespace-nowrap ml-2">{formatCurrency(avgExpensePerDay)}</span>
          </div>

          {/* Transaction Count */}
          <div className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
              <span className="text-xs sm:text-sm text-gray-600">Total transacciones</span>
            </div>
            <span className="text-xs sm:text-sm font-medium">{transactionCount}</span>
          </div>

          {/* Savings Rate */}
          <div className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
              <span className="text-xs sm:text-sm text-gray-600">Tasa de ahorro</span>
            </div>
            <span className="text-xs sm:text-sm font-medium">
              {((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </motion.div>

      {/* Categories Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          <span>Top Categorías</span>
        </h3>
        
        <div className="space-y-3">
          {[
            { name: 'Alimentación', amount: 295500, color: 'bg-blue-500', percent: 59 },
            { name: 'Compras', amount: 89990, color: 'bg-purple-500', percent: 18 },
            { name: 'Servicios', amount: 65000, color: 'bg-green-500', percent: 13 },
            { name: 'Transporte', amount: 32500, color: 'bg-orange-500', percent: 6 }
          ].map((category, index) => (
            <div key={category.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs sm:text-sm text-gray-700 truncate">{category.name}</span>
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap ml-2">{formatCurrency(category.amount)}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${category.percent}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                  className={`h-full rounded-full ${category.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 border border-blue-100"
      >
        <h3 className="text-base sm:text-lg mb-2 sm:mb-3 text-blue-900">💡 Consejo del día</h3>
        <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
          Considera reducir tus gastos en alimentación un 20%. Esto podría ahorrarte 
          aproximadamente <strong>{formatCurrency(295500 * 0.2)}</strong> este mes.
        </p>
      </motion.div>
    </div>
  );
}