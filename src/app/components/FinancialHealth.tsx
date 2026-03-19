import { motion } from 'motion/react';
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

interface FinancialHealthProps {
  totalIncome: number;
  totalExpenses: number;
  budgetLimit: number;
}

export function FinancialHealth({ totalIncome, totalExpenses, budgetLimit }: FinancialHealthProps) {
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
  const budgetUsage = (totalExpenses / budgetLimit) * 100;

  let healthScore = 50;
  if (savingsRate >= 30) healthScore += 40;
  else if (savingsRate >= 20) healthScore += 30;
  else if (savingsRate >= 10) healthScore += 20;
  else if (savingsRate >= 0) healthScore += 10;
  else healthScore -= 10;

  if (budgetUsage <= 80) healthScore += 30;
  else if (budgetUsage <= 100) healthScore += 20;
  else if (budgetUsage <= 120) healthScore += 5;
  else healthScore -= 20;

  const ratio = totalIncome > 0 ? totalExpenses / totalIncome : 1;
  if (ratio <= 0.5) healthScore += 20;
  else if (ratio <= 0.7) healthScore += 15;
  else if (ratio <= 0.9) healthScore += 10;

  healthScore = Math.max(0, Math.min(100, healthScore));

  const getHealthStatus = () => {
    if (healthScore >= 80) return {
      label: 'Excelente',
      color: 'text-green-500 dark:text-green-400',
      ringColor: '#22c55e',
      gradient: 'from-green-500 to-emerald-600',
      glow: 'shadow-green-500/30',
      border: 'border-green-200 dark:border-green-500/30',
      lightBg: 'from-green-50 to-emerald-50/40',
      icon: CheckCircle,
    };
    if (healthScore >= 60) return {
      label: 'Buena',
      color: 'text-blue-500 dark:text-blue-400',
      ringColor: '#3b82f6',
      gradient: 'from-blue-500 to-blue-700',
      glow: 'shadow-blue-500/30',
      border: 'border-blue-200 dark:border-blue-500/30',
      lightBg: 'from-blue-50 to-blue-50/40',
      icon: TrendingUp,
    };
    if (healthScore >= 40) return {
      label: 'Regular',
      color: 'text-orange-500 dark:text-orange-400',
      ringColor: '#f97316',
      gradient: 'from-orange-500 to-orange-700',
      glow: 'shadow-orange-500/30',
      border: 'border-orange-200 dark:border-orange-500/30',
      lightBg: 'from-orange-50 to-orange-50/40',
      icon: Activity,
    };
    return {
      label: 'Necesita atención',
      color: 'text-red-500 dark:text-red-400',
      ringColor: '#ef4444',
      gradient: 'from-red-500 to-red-700',
      glow: 'shadow-red-500/30',
      border: 'border-red-200 dark:border-red-500/30',
      lightBg: 'from-red-50 to-red-50/40',
      icon: AlertTriangle,
    };
  };

  const status = getHealthStatus();
  const StatusIcon = status.icon;

  const insights: { type: 'success' | 'warning' | 'danger'; text: string }[] = [];
  if (savingsRate < 10) {
    insights.push({ type: 'warning', text: 'Tu tasa de ahorro es baja. Intenta reducir gastos.' });
  } else if (savingsRate >= 20) {
    insights.push({ type: 'success', text: '¡Excelente! Estás ahorrando más del 20%.' });
  }
  if (budgetUsage > 100) {
    insights.push({ type: 'danger', text: 'Has excedido tu presupuesto mensual.' });
  } else if (budgetUsage > 80) {
    insights.push({ type: 'warning', text: 'Estás cerca del límite de tu presupuesto.' });
  }

  const tip = savingsRate < 10
    ? 'Aplica la regla 50/30/20: necesidades, deseos y ahorros.'
    : savingsRate >= 20
    ? 'Considera invertir parte de tus ahorros para hacerlos crecer.'
    : 'Estás en buen camino. Sigue aumentando tu ahorro gradualmente.';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`
        relative overflow-hidden rounded-2xl p-5 sm:p-6
        bg-gradient-to-br ${status.lightBg}
        dark:bg-none dark:bg-gray-800/90
        border ${status.border}
        shadow-lg ${status.glow} dark:shadow-black/40
        hover:shadow-xl transition-all duration-300
        backdrop-blur-sm
      `}
    >
      {/* Decorative glow dark mode */}
      <div className={`
        absolute -right-10 -top-10 w-48 h-48 rounded-full
        opacity-0 dark:opacity-10
        bg-gradient-to-br ${status.gradient}
        blur-3xl pointer-events-none
      `} />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5 relative">
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${status.gradient} shadow-md ${status.glow}`}>
          <Activity className="w-5 h-5 text-white drop-shadow" />
        </div>
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">Salud Financiera</p>
          <p className={`text-lg font-bold ${status.color}`}>{status.label}</p>
        </div>
      </div>

      {/* Score Circle */}
      <div className="flex items-center justify-center mb-5">
        <div className="relative w-36 h-36">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="66" stroke="currentColor" strokeWidth="10" fill="none"
              className="text-gray-200 dark:text-gray-700" />
            <motion.circle
              cx="80" cy="80" r="66"
              stroke={status.ringColor}
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="414.69"
              initial={{ strokeDashoffset: 414.69 }}
              animate={{ strokeDashoffset: 414.69 - (414.69 * healthScore) / 100 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{ filter: `drop-shadow(0 0 6px ${status.ringColor}88)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <StatusIcon className={`w-7 h-7 mb-0.5 ${status.color}`} />
            <span className="text-3xl font-bold text-gray-900 dark:text-white leading-none">
              {Math.round(healthScore)}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">de 100</span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/70 dark:bg-gray-900/50 rounded-xl p-3.5 border border-white dark:border-gray-700/50 backdrop-blur-sm">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Tasa de ahorro</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{savingsRate.toFixed(0)}%</p>
          <div className="mt-1.5 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(savingsRate, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full rounded-full bg-gradient-to-r ${status.gradient}`}
            />
          </div>
        </div>
        <div className="bg-white/70 dark:bg-gray-900/50 rounded-xl p-3.5 border border-white dark:border-gray-700/50 backdrop-blur-sm">
          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Uso presupuesto</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{budgetUsage.toFixed(0)}%</p>
          <div className="mt-1.5 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(budgetUsage, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
              className={`h-full rounded-full bg-gradient-to-r ${budgetUsage > 100 ? 'from-red-500 to-red-600' : budgetUsage > 80 ? 'from-orange-500 to-orange-600' : status.gradient}`}
            />
          </div>
        </div>
      </div>

      {/* Insights compactos */}
      {insights.length > 0 && (
        <div className="space-y-2 mb-3">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium ${
                insight.type === 'success'
                  ? 'bg-green-100/80 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700/40'
                  : insight.type === 'warning'
                  ? 'bg-orange-100/80 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-700/40'
                  : 'bg-red-100/80 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700/40'
              }`}
            >
              {insight.type === 'success'
                ? <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                : <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />}
              {insight.text}
            </motion.div>
          ))}
        </div>
      )}

      {/* Tip compacto */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-700/30"
      >
        <Lightbulb className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800 dark:text-blue-300">{tip}</p>
      </motion.div>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${status.gradient} opacity-60`} />
    </motion.div>
  );
}