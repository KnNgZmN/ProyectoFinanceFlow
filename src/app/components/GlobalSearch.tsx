import { motion } from 'motion/react';
import { Search, X, Clock, TrendingUp, Target, DollarSign, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Transaction } from './TransactionList';
import { formatCurrency } from '../utils/currency';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
  onNavigate: (tab: string, item?: any) => void;
}

interface SearchResult {
  type: 'transaction' | 'category' | 'action' | 'section';
  title: string;
  subtitle?: string;
  icon: any;
  action: () => void;
  metadata?: string;
}

export function GlobalSearch({ isOpen, onClose, transactions, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search in transactions
    const matchedTransactions = transactions
      .filter(t => 
        t.description.toLowerCase().includes(searchQuery) ||
        t.category.toLowerCase().includes(searchQuery) ||
        t.amount.toString().includes(searchQuery)
      )
      .slice(0, 5)
      .map(t => ({
        type: 'transaction' as const,
        title: t.description,
        subtitle: t.category,
        icon: DollarSign,
        metadata: `${formatCurrency(t.amount)} • ${t.date}`,
        action: () => {
          onNavigate('home');
          onClose();
        }
      }));

    searchResults.push(...matchedTransactions);

    // Search in sections
    const sections = [
      { name: 'Inicio', keywords: ['dashboard', 'inicio', 'home', 'resumen'], tab: 'home' },
      { name: 'Análisis y Logros', keywords: ['analisis', 'stats', 'estadisticas', 'logros', 'achievements'], tab: 'stats' },
      { name: 'Metas de Ahorro', keywords: ['metas', 'ahorro', 'goals', 'objetivos'], tab: 'goals' },
      { name: 'Perfil y Ajustes', keywords: ['perfil', 'configuracion', 'ajustes', 'profile', 'settings'], tab: 'profile' },
    ];

    sections.forEach(section => {
      if (section.keywords.some(k => k.includes(searchQuery))) {
        searchResults.push({
          type: 'section',
          title: section.name,
          subtitle: 'Navegar a sección',
          icon: ArrowRight,
          action: () => {
            onNavigate(section.tab);
            onClose();
            saveRecentSearch(query);
          }
        });
      }
    });

    // Search in categories
    const categories = ['Alimentación', 'Transporte', 'Entretenimiento', 'Compras', 'Servicios', 'Salud', 'Salario', 'Freelance'];
    categories.forEach(cat => {
      if (cat.toLowerCase().includes(searchQuery)) {
        const catTransactions = transactions.filter(t => t.category === cat);
        const total = catTransactions.reduce((sum, t) => sum + t.amount, 0);
        
        searchResults.push({
          type: 'category',
          title: cat,
          subtitle: `${catTransactions.length} transacciones`,
          icon: Target,
          metadata: formatCurrency(total),
          action: () => {
            onNavigate('home');
            onClose();
            saveRecentSearch(query);
          }
        });
      }
    });

    // Quick actions
    const actions = [
      { name: 'Agregar gasto', keywords: ['agregar', 'nuevo', 'gasto', 'add', 'expense'], action: () => {} },
      { name: 'Ver metas', keywords: ['metas', 'objetivos', 'goals'], action: () => onNavigate('goals') },
      { name: 'Exportar datos', keywords: ['exportar', 'descargar', 'export', 'pdf', 'csv'], action: () => {} },
    ];

    actions.forEach(action => {
      if (action.keywords.some(k => k.includes(searchQuery))) {
        searchResults.push({
          type: 'action',
          title: action.name,
          subtitle: 'Acción rápida',
          icon: TrendingUp,
          action: () => {
            action.action();
            onClose();
            saveRecentSearch(query);
          }
        });
      }
    });

    setResults(searchResults.slice(0, 8));
  }, [query, transactions]);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveRecentSearch = (search: string) => {
    const updated = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSearchClick = (searchTerm: string) => {
    setQuery(searchTerm);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      />

      <div className="fixed inset-0 flex items-start justify-center z-50 p-4 pt-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl shadow-2xl pointer-events-auto overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar transacciones, categorías, secciones..."
              autoFocus
              className="flex-1 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none text-lg"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {!query && recentSearches.length > 0 && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Búsquedas recientes
                  </h3>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Limpiar
                  </button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchClick(search)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm text-gray-700 dark:text-gray-300"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query && results.length === 0 && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">No se encontraron resultados</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  Intenta con otro término de búsqueda
                </p>
              </div>
            )}

            {results.length > 0 && (
              <div className="p-2">
                {results.map((result, index) => {
                  const Icon = result.icon;
                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={result.action}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left group"
                    >
                      <div className={`p-2 rounded-lg flex-shrink-0 ${
                        result.type === 'transaction' ? 'bg-blue-100 dark:bg-blue-900/30' :
                        result.type === 'category' ? 'bg-purple-100 dark:bg-purple-900/30' :
                        result.type === 'section' ? 'bg-green-100 dark:bg-green-900/30' :
                        'bg-orange-100 dark:bg-orange-900/30'
                      }`}>
                        <Icon className={`w-4 h-4 ${
                          result.type === 'transaction' ? 'text-blue-600 dark:text-blue-400' :
                          result.type === 'category' ? 'text-purple-600 dark:text-purple-400' :
                          result.type === 'section' ? 'text-green-600 dark:text-green-400' :
                          'text-orange-600 dark:text-orange-400'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                          {result.title}
                        </p>
                        {result.subtitle && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {result.subtitle}
                          </p>
                        )}
                      </div>
                      {result.metadata && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                          {result.metadata}
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Tip */}
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">⌘K</kbd>
                para abrir
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs">ESC</kbd>
                para cerrar
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
