import { motion, AnimatePresence } from 'motion/react';
import { X, Zap } from 'lucide-react';
import { useState } from 'react';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: {
    description: string;
    amount: number;
    category: string;
    type: 'income' | 'expense';
  }) => void;
}

interface Category {
  id: string;
  name: string;
  emoji: string;
  type: 'expense' | 'income';
}

const categories: Category[] = [
  { id: '1', name: 'Alimentación', emoji: '🍔', type: 'expense' },
  { id: '2', name: 'Transporte', emoji: '🚗', type: 'expense' },
  { id: '3', name: 'Entretenimiento', emoji: '🎮', type: 'expense' },
  { id: '4', name: 'Compras', emoji: '🛍️', type: 'expense' },
  { id: '5', name: 'Servicios', emoji: '💡', type: 'expense' },
  { id: '6', name: 'Salud', emoji: '💊', type: 'expense' },
  { id: '7', name: 'Salario', emoji: '💰', type: 'income' },
  { id: '8', name: 'Freelance', emoji: '💻', type: 'income' },
  { id: '9', name: 'Inversión', emoji: '📈', type: 'income' },
];

export function QuickAddModal({ isOpen, onClose, onAdd }: QuickAddModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const filteredCategories = categories.filter(cat => cat.type === type);

  const handleCategorySelect = (cat: Category) => {
    setCategory(cat.name);
    setDescription(cat.name);
    setStep(2);
  };

  const handleSubmit = () => {
    if (!amount || !category) return;

    onAdd({
      description: description || category,
      amount: parseFloat(amount),
      category,
      type
    });

    // Reset
    setStep(1);
    setAmount('');
    setCategory('');
    setDescription('');
    setType('expense');
    onClose();
  };

  const handleClose = () => {
    setStep(1);
    setAmount('');
    setCategory('');
    setDescription('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="bg-white dark:bg-gray-900 w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl pointer-events-auto max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-xl">
                    <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold dark:text-white">Agregar Rápido</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Paso {step} de 2
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="h-1 bg-gray-100 dark:bg-gray-800">
                <motion.div
                  initial={{ width: '50%' }}
                  animate={{ width: step === 1 ? '50%' : '100%' }}
                  className="h-full bg-blue-600 dark:bg-blue-500"
                />
              </div>

              <div className="flex-1 overflow-y-auto">
                {step === 1 ? (
                  /* Step 1: Type & Category */
                  <div className="p-4 sm:p-6 space-y-6">
                    {/* Type Toggle */}
                    <div className="flex gap-3 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                      <button
                        onClick={() => setType('expense')}
                        className={`flex-1 py-3 rounded-xl transition-all font-medium ${
                          type === 'expense'
                            ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        💸 Gasto
                      </button>
                      <button
                        onClick={() => setType('income')}
                        className={`flex-1 py-3 rounded-xl transition-all font-medium ${
                          type === 'income'
                            ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        💰 Ingreso
                      </button>
                    </div>

                    {/* Categories */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Selecciona categoría
                      </h3>
                      <div className="grid grid-cols-3 gap-3">
                        {filteredCategories.map((cat) => (
                          <motion.button
                            key={cat.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCategorySelect(cat)}
                            className="flex flex-col items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-colors border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400"
                          >
                            <span className="text-3xl">{cat.emoji}</span>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
                              {cat.name}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Step 2: Amount & Description */
                  <div className="p-4 sm:p-6 space-y-6">
                    {/* Selected Category */}
                    <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                      <span className="text-3xl">
                        {categories.find(c => c.name === category)?.emoji}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Categoría</p>
                        <p className="font-medium dark:text-white">{category}</p>
                      </div>
                      <button
                        onClick={() => setStep(1)}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Cambiar
                      </button>
                    </div>

                    {/* Amount Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Monto
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400 dark:text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          inputMode="numeric"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0"
                          autoFocus
                          className="w-full pl-12 pr-4 py-4 text-3xl font-bold bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Description (Optional) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Descripción (opcional)
                      </label>
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ej: Almuerzo en restaurante"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              {step === 2 && (
                <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleSubmit}
                    disabled={!amount}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-semibold rounded-2xl transition-colors disabled:cursor-not-allowed text-lg"
                  >
                    Agregar {amount && `$ ${parseFloat(amount).toLocaleString('es-CO')}`}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
