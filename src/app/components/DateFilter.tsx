import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Filter, Download, FileText, FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';
import { Transaction } from './TransactionList';
import { formatCurrency } from '../utils/currency';

interface DateFilterProps {
  transactions: Transaction[];
  onClose: () => void;
}

export function DateFilter({ transactions, onClose }: DateFilterProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv'>('pdf');

  const filtered = transactions.filter(t => {
    if (!startDate && !endDate) return true;
    const tDate = new Date(t.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    if (start && tDate < start) return false;
    if (end && tDate > end) return false;
    return true;
  });

  const totalIncome = filtered.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = filtered.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  const handleExport = () => {
    if (exportFormat === 'csv') {
      const headers = 'Fecha,Descripción,Categoría,Tipo,Monto\n';
      const rows = filtered.map(t =>
        `${t.date},"${t.description}",${t.category},${t.type === 'income' ? 'Ingreso' : 'Gasto'},${t.amount}`
      ).join('\n');

      const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `financeflow_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } else {
      alert('Función de exportación PDF estará disponible próximamente');
    }
  };

  const toISO = (date: Date) => date.toISOString().split('T')[0];

  const quickFilters = [
    { label: 'Hoy', getValue: () => {
      const today = toISO(new Date());
      return { start: today, end: today };
    }},
    { label: 'Esta semana', getValue: () => {
      const now = new Date();
      const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
      return { start: toISO(weekStart), end: toISO(new Date()) };
    }},
    { label: 'Este mes', getValue: () => {
      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      return { start: toISO(monthStart), end: toISO(new Date()) };
    }},
    { label: 'Últimos 30 días', getValue: () => {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
      return { start: toISO(thirtyDaysAgo), end: toISO(new Date()) };
    }},
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />

      <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="bg-white dark:bg-gray-900 w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-xl">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold dark:text-white">Filtrar y Exportar</h2>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-6">
            {/* Quick Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Filtros rápidos</h3>
              <div className="grid grid-cols-2 gap-2">
                {quickFilters.map((filter) => (
                  <button
                    key={filter.label}
                    onClick={() => {
                      const dates = filter.getValue();
                      setStartDate(dates.start);
                      setEndDate(dates.end);
                    }}
                    className="px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Range */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Rango personalizado</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Desde</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Hasta</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
              <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-3">Resumen del período</h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-blue-700 dark:text-blue-400 mb-1">Transacciones</p>
                  <p className="text-xl font-bold text-blue-900 dark:text-blue-300">{filtered.length}</p>
                </div>
                <div>
                  <p className="text-xs text-green-700 dark:text-green-400 mb-1">Ingresos</p>
                  <p className="text-sm font-bold text-green-900 dark:text-green-300">{formatCurrency(totalIncome)}</p>
                </div>
                <div>
                  <p className="text-xs text-red-700 dark:text-red-400 mb-1">Gastos</p>
                  <p className="text-sm font-bold text-red-900 dark:text-red-300">{formatCurrency(totalExpenses)}</p>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Formato de exportación</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setExportFormat('pdf')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                    exportFormat === 'pdf'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">PDF</span>
                </button>
                <button
                  onClick={() => setExportFormat('csv')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                    exportFormat === 'csv'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FileSpreadsheet className="w-5 h-5" />
                  <span className="font-medium">CSV</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleExport}
                disabled={filtered.length === 0}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-semibold rounded-xl transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Exportar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
