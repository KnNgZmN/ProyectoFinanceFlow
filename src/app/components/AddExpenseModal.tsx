import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, DollarSign, Calendar, Tag, FileText, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExpense: (expense: {
    description: string;
    amount: number;
    category: string;
    date: string;
    type: 'income' | 'expense';
  }) => void;
}

export function AddExpenseModal({ isOpen, onClose, onAddExpense }: AddExpenseModalProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showHelp, setShowHelp] = useState(false);

  const categories = ['Alimentación', 'Transporte', 'Entretenimiento', 'Compras', 'Servicios', 'Salario', 'Otros'];

  // Real-time validation
  useEffect(() => {
    const newErrors: Record<string, string> = {};

    if (touched.description && !description.trim()) {
      newErrors.description = 'La descripción es requerida';
    } else if (touched.description && description.trim().length < 3) {
      newErrors.description = 'Mínimo 3 caracteres';
    }

    if (touched.amount) {
      const numAmount = parseFloat(amount);
      if (!amount) {
        newErrors.amount = 'El monto es requerido';
      } else if (isNaN(numAmount) || numAmount <= 0) {
        newErrors.amount = 'Debe ser un número positivo';
      } else if (numAmount > 100000000) {
        newErrors.amount = 'El monto es demasiado alto';
      }
    }

    if (touched.category && !category) {
      newErrors.category = 'Selecciona una categoría';
    }

    setErrors(newErrors);
  }, [description, amount, category, touched]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      description: true,
      amount: true,
      category: true
    });

    // Validate all fields
    if (!description.trim() || !amount || !category) {
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return;
    }

    onAddExpense({
      description: description.trim(),
      amount: numAmount,
      category,
      date,
      type
    });

    // Reset form
    setDescription('');
    setAmount('');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
    setType('expense');
    setErrors({});
    setTouched({});
    setShowHelp(false);
    onClose();
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const isValid = description.trim().length >= 3 && 
                  parseFloat(amount) > 0 && 
                  !isNaN(parseFloat(amount)) &&
                  category;

  const hasErrors = Object.keys(errors).length > 0;
  const allTouched = touched.description && touched.amount && touched.category;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
                <div>
                  <h2 className="text-lg sm:text-xl">Agregar Transacción</h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Completa todos los campos requeridos
                  </p>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Tooltip content="Ayuda">
                    <button
                      onClick={() => setShowHelp(!showHelp)}
                      className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                        showHelp ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-500'
                      }`}
                      aria-label="Ayuda"
                    >
                      <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </Tooltip>
                  <button
                    onClick={onClose}
                    className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Cerrar modal"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Help Banner */}
              <AnimatePresence>
                {showHelp && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-blue-50 border-b border-blue-100"
                  >
                    <div className="p-3 sm:p-4 text-xs sm:text-sm text-blue-800">
                      <p className="font-medium mb-2">💡 Consejos:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Usa descripciones claras y concisas</li>
                        <li>• El monto debe ser mayor a 0</li>
                        <li>• Selecciona la categoría más apropiada</li>
                        <li>• La fecha no puede ser futura</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Progress Indicator */}
              <div className="px-4 sm:px-6 pt-3 sm:pt-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-gray-600">Progreso del formulario</span>
                  <span className="text-gray-900 font-medium">
                    {Object.values({ description: !!description.trim(), amount: parseFloat(amount) > 0, category: !!category }).filter(Boolean).length}/3
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(Object.values({ description: !!description.trim(), amount: parseFloat(amount) > 0, category: !!category }).filter(Boolean).length / 3) * 100}%`
                    }}
                    className={`h-full rounded-full transition-colors ${
                      isValid ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                  />
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                {/* Type Toggle */}
                <div>
                  <label className="block text-xs sm:text-sm text-gray-700 mb-2">
                    Tipo de transacción
                  </label>
                  <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setType('expense')}
                      className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition-all text-sm sm:text-base ${
                        type === 'expense'
                          ? 'bg-white shadow-sm text-gray-900 border-2 border-gray-200'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      💸 Gasto
                    </button>
                    <button
                      type="button"
                      onClick={() => setType('income')}
                      className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition-all text-sm sm:text-base ${
                        type === 'income'
                          ? 'bg-white shadow-sm text-gray-900 border-2 border-gray-200'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      💰 Ingreso
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs sm:text-sm text-gray-700 mb-2">
                    <FileText className="inline w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    Descripción <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => handleBlur('description')}
                    placeholder="Ej: Compra en supermercado"
                    maxLength={100}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      errors.description && touched.description
                        ? 'border-red-300 focus:ring-red-500 bg-red-50'
                        : !errors.description && touched.description && description.trim().length >= 3
                        ? 'border-green-300 focus:ring-green-500 bg-green-50'
                        : 'border-gray-200 focus:ring-blue-500'
                    }`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <AnimatePresence mode="wait">
                      {errors.description && touched.description && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="flex items-center gap-1 text-xs sm:text-sm text-red-600"
                        >
                          <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {errors.description}
                        </motion.div>
                      )}
                      {!errors.description && touched.description && description.trim().length >= 3 && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="flex items-center gap-1 text-xs sm:text-sm text-green-600"
                        >
                          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          Correcto
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="text-xs text-gray-400">
                      {description.length}/100
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-xs sm:text-sm text-gray-700 mb-2">
                    <DollarSign className="inline w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    Monto (COP) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm sm:text-base">$</span>
                    <input
                      type="number"
                      step="1"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      onBlur={() => handleBlur('amount')}
                      placeholder="0"
                      className={`w-full pl-7 sm:pl-8 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.amount && touched.amount
                          ? 'border-red-300 focus:ring-red-500 bg-red-50'
                          : !errors.amount && touched.amount && amount && parseFloat(amount) > 0
                          ? 'border-green-300 focus:ring-green-500 bg-green-50'
                          : 'border-gray-200 focus:ring-blue-500'
                      }`}
                    />
                  </div>
                  <AnimatePresence mode="wait">
                    {errors.amount && touched.amount && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-1 mt-1 text-xs sm:text-sm text-red-600"
                      >
                        <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {errors.amount}
                      </motion.div>
                    )}
                    {!errors.amount && touched.amount && amount && parseFloat(amount) > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-center gap-1 mt-1 text-xs sm:text-sm text-green-600"
                      >
                        <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Monto válido
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs sm:text-sm text-gray-700 mb-2">
                    <Tag className="inline w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    Categoría <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    onBlur={() => handleBlur('category')}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 rounded-xl focus:outline-none focus:ring-2 appearance-none cursor-pointer transition-all ${
                      errors.category && touched.category
                        ? 'border-red-300 focus:ring-red-500 bg-red-50'
                        : category
                        ? 'border-green-300 focus:ring-green-500 bg-green-50'
                        : 'border-gray-200 focus:ring-blue-500'
                    }`}
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && touched.category && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 mt-1 text-xs sm:text-sm text-red-600"
                    >
                      <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      {errors.category}
                    </motion.div>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs sm:text-sm text-gray-700 mb-2">
                    <Calendar className="inline w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    No se permiten fechas futuras
                  </p>
                </div>

                {/* Validation Summary */}
                {allTouched && hasErrors && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl"
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm text-red-800 font-medium mb-1">
                          Por favor corrige los siguientes errores:
                        </p>
                        <ul className="text-xs text-red-700 space-y-1">
                          {Object.entries(errors).map(([field, error]) => (
                            <li key={field}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex gap-2 sm:gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <Tooltip content={!isValid ? 'Completa todos los campos correctamente' : 'Guardar transacción'}>
                    <button
                      type="submit"
                      disabled={!isValid}
                      className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl transition-all ${
                        isValid
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isValid ? '✓ Agregar' : 'Completar campos'}
                    </button>
                  </Tooltip>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}