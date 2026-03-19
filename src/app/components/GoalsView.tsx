import { motion } from 'motion/react';
import { Target, TrendingUp, AlertCircle, Plus } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  emoji: string;
  deadline: string;
}

const goalColors: Record<string, { gradient: string; glow: string; border: string; lightBg: string; darkBorder: string; barGradient: string }> = {
  '1': { gradient: 'from-blue-500 to-blue-700',    glow: 'shadow-blue-500/20',   border: 'border-blue-200',   lightBg: 'from-blue-50 to-blue-50/40',    darkBorder: 'dark:border-blue-500/30',   barGradient: 'from-blue-400 to-blue-600'   },
  '2': { gradient: 'from-violet-500 to-purple-700', glow: 'shadow-violet-500/20', border: 'border-violet-200', lightBg: 'from-violet-50 to-purple-50/40', darkBorder: 'dark:border-violet-500/30', barGradient: 'from-violet-400 to-purple-600' },
  '3': { gradient: 'from-orange-500 to-orange-700', glow: 'shadow-orange-500/20', border: 'border-orange-200', lightBg: 'from-orange-50 to-orange-50/40', darkBorder: 'dark:border-orange-500/30', barGradient: 'from-orange-400 to-orange-600' },
};

interface GoalCardProps {
  goal: Goal;
  index: number;
}

function GoalCard({ goal, index }: GoalCardProps) {
  const progress   = (goal.current / goal.target) * 100;
  const remaining  = goal.target - goal.current;
  const isComplete = progress >= 100;
  const colors     = goalColors[goal.id] ?? goalColors['1'];

  const barColor = isComplete
    ? 'from-green-400 to-green-600'
    : progress > 70
    ? colors.barGradient
    : colors.barGradient;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`
        relative overflow-hidden rounded-2xl p-5
        bg-gradient-to-br ${isComplete ? 'from-green-50 to-emerald-50/40' : colors.lightBg}
        dark:bg-none dark:bg-gray-800/90
        border ${isComplete ? 'border-green-200 dark:border-green-500/30' : `${colors.border} ${colors.darkBorder}`}
        shadow-lg ${isComplete ? 'shadow-green-500/10' : colors.glow} dark:shadow-black/40
        hover:shadow-xl transition-all duration-300
        backdrop-blur-sm
      `}
    >
      {/* Glow dark */}
      <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-0 dark:opacity-10 bg-gradient-to-br ${isComplete ? 'from-green-500 to-emerald-500' : colors.gradient} blur-2xl pointer-events-none`} />

      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative">
        <div className="flex items-center gap-3">
          <div className={`
            w-12 h-12 flex items-center justify-center text-2xl rounded-xl flex-shrink-0
            ${isComplete
              ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-700/40'
              : 'bg-white/70 dark:bg-gray-700/50 border border-white dark:border-gray-600/40'
            }
          `}>
            {goal.emoji}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white tracking-tight leading-tight">{goal.name}</h3>
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mt-0.5">Vence: {goal.deadline}</p>
          </div>
        </div>
        {isComplete && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700/40 px-2.5 py-1 rounded-lg tracking-tight">
            ✓ Completado
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="space-y-2 relative">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Progreso</span>
          <span className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">{progress.toFixed(0)}%</span>
        </div>

        <div className="h-2 bg-gray-200/70 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: index * 0.07 }}
            className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
          />
        </div>

        {/* Amounts */}
        <div className="flex items-center justify-between pt-2">
          <div className="bg-white/70 dark:bg-gray-900/50 rounded-xl px-3 py-2 border border-white dark:border-gray-700/50 backdrop-blur-sm">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-0.5">Ahorrado</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">{formatCurrency(goal.current)}</p>
          </div>
          <div className="bg-white/70 dark:bg-gray-900/50 rounded-xl px-3 py-2 border border-white dark:border-gray-700/50 backdrop-blur-sm text-right">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-0.5">Faltan</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">{formatCurrency(Math.max(remaining, 0))}</p>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${isComplete ? 'from-green-400 to-emerald-400' : colors.gradient} opacity-60`} />
    </motion.div>
  );
}

interface GoalsViewProps {
  totalIncome: number;
  totalExpenses: number;
}

export function GoalsView({ totalIncome, totalExpenses }: GoalsViewProps) {
  const goals: Goal[] = [
    { id: '1', name: 'Fondo de Emergencia', target: 5000000, current: 3500000, emoji: '🏦', deadline: 'Dic 2026' },
    { id: '2', name: 'Vacaciones',          target: 3000000, current: 1200000, emoji: '✈️', deadline: 'Jun 2026' },
    { id: '3', name: 'Nuevo Portátil',      target: 2500000, current: 800000,  emoji: '💻', deadline: 'Ago 2026' },
  ];

  const monthlySavings    = totalIncome - totalExpenses;
  const totalGoalsTarget  = goals.reduce((sum, g) => sum + g.target, 0);
  const totalGoalsCurrent = goals.reduce((sum, g) => sum + g.current, 0);
  const overallProgress   = (totalGoalsCurrent / totalGoalsTarget) * 100;

  return (
    <div className="space-y-5 pb-24 lg:pb-8">

      {/* ── Header card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className="
          relative overflow-hidden rounded-2xl p-5 sm:p-6
          bg-gradient-to-br from-blue-50 to-indigo-50/40
          dark:bg-none dark:bg-gray-800/90
          border border-blue-200 dark:border-blue-500/30
          shadow-lg shadow-blue-500/10 dark:shadow-black/40
          hover:shadow-xl transition-all duration-300
          backdrop-blur-sm
        "
      >
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-0 dark:opacity-10 bg-gradient-to-br from-blue-500 to-indigo-500 blur-3xl pointer-events-none" />

        {/* Header row */}
        <div className="flex items-center gap-2.5 mb-5 relative">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/30">
            <Target className="w-5 h-5 text-white drop-shadow" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Metas de Ahorro</p>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight leading-tight">Mis Metas</h2>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 relative">
          <div className="bg-white/70 dark:bg-gray-900/50 rounded-xl p-3.5 border border-white dark:border-gray-700/50 backdrop-blur-sm">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Total ahorrado</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{formatCurrency(totalGoalsCurrent)}</p>
            <div className="mt-1.5 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
              />
            </div>
          </div>
          <div className="bg-white/70 dark:bg-gray-900/50 rounded-xl p-3.5 border border-white dark:border-gray-700/50 backdrop-blur-sm">
            <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">Progreso total</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{overallProgress.toFixed(0)}%</p>
            <div className="mt-1.5 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 1.1, ease: 'easeOut', delay: 0.1 }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-60" />
      </motion.div>

      {/* ── Monthly savings indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className={`
          relative overflow-hidden rounded-2xl p-4
          backdrop-blur-sm border transition-all duration-300
          ${monthlySavings > 0
            ? 'bg-gradient-to-br from-green-50 to-emerald-50/40 dark:bg-none dark:bg-gray-800/90 border-green-200 dark:border-green-500/30 shadow-md shadow-green-500/10 dark:shadow-black/30'
            : 'bg-gradient-to-br from-red-50 to-red-50/40 dark:bg-none dark:bg-gray-800/90 border-red-200 dark:border-red-500/30 shadow-md shadow-red-500/10 dark:shadow-black/30'
          }
        `}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-xl shadow-md flex-shrink-0 ${monthlySavings > 0 ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-green-500/30' : 'bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/30'}`}>
            {monthlySavings > 0
              ? <TrendingUp className="w-4 h-4 text-white drop-shadow" />
              : <AlertCircle className="w-4 h-4 text-white drop-shadow" />
            }
          </div>
          <div>
            <p className="font-bold tracking-tight text-gray-900 dark:text-white">
              {monthlySavings > 0 ? `Ahorrando ${formatCurrency(monthlySavings)} este mes` : 'No estás ahorrando este mes'}
            </p>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-tight mt-0.5">
              {monthlySavings > 0
                ? `A este ritmo alcanzarás tu meta en ${Math.ceil((totalGoalsTarget - totalGoalsCurrent) / monthlySavings)} meses`
                : 'Reduce gastos para alcanzar tus metas'
              }
            </p>
          </div>
        </div>
        <div className={`absolute bottom-0 left-0 right-0 h-0.5 opacity-60 bg-gradient-to-r ${monthlySavings > 0 ? 'from-green-400 to-emerald-400' : 'from-red-400 to-red-500'}`} />
      </motion.div>

      {/* ── Goal cards ── */}
      <div className="space-y-4">
        {goals.map((goal, index) => (
          <GoalCard key={goal.id} goal={goal} index={index} />
        ))}
      </div>

      {/* ── Add goal button ── */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        whileHover={{ y: -2, transition: { duration: 0.15 } }}
        className="
          w-full py-4 flex items-center justify-center gap-2
          rounded-2xl border-2 border-dashed
          border-gray-300 dark:border-gray-700
          hover:border-blue-400 dark:hover:border-blue-500
          text-gray-400 dark:text-gray-500
          hover:text-blue-600 dark:hover:text-blue-400
          font-semibold text-sm tracking-tight
          transition-all duration-200
          hover:bg-blue-50/50 dark:hover:bg-blue-900/10
        "
      >
        <Plus className="w-4 h-4" />
        Agregar nueva meta
      </motion.button>

    </div>
  );
}