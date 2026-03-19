import { motion } from 'motion/react';
import { Trophy, Star, Zap } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export function Achievements() {
  const achievements: Achievement[] = [
    { id: '1', title: 'Primera transacción',      description: 'Registra tu primera transacción',              icon: '🎯', unlocked: true  },
    { id: '2', title: 'Ahorrador novato',          description: 'Ahorra $500.000 en un mes',                    icon: '💰', unlocked: true  },
    { id: '3', title: 'Racha de 7 días',           description: 'Registra gastos por 7 días consecutivos',      icon: '🔥', unlocked: false, progress: 5,  maxProgress: 7   },
    { id: '4', title: 'Meta cumplida',             description: 'Completa tu primera meta de ahorro',           icon: '🏆', unlocked: false, progress: 70, maxProgress: 100 },
    { id: '5', title: 'Presupuesto disciplinado',  description: 'No excedas tu presupuesto por 3 meses',        icon: '⭐', unlocked: false, progress: 1,  maxProgress: 3   },
    { id: '6', title: 'Maestro del ahorro',        description: 'Ahorra más del 30% de tus ingresos',           icon: '👑', unlocked: false },
  ];

  const unlockedCount    = achievements.filter(a => a.unlocked).length;
  const totalCount       = achievements.length;
  const overallProgress  = (unlockedCount / totalCount) * 100;

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
          bg-gradient-to-br from-purple-50 to-pink-50/40
          dark:bg-none dark:bg-gray-800/90
          border border-purple-200 dark:border-purple-500/30
          shadow-lg shadow-purple-500/10 dark:shadow-black/40
          hover:shadow-xl transition-all duration-300
          backdrop-blur-sm
        "
      >
        {/* Glow dark */}
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-0 dark:opacity-10 bg-gradient-to-br from-purple-500 to-pink-500 blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between relative">
          {/* Left: icon + title + score */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-md shadow-purple-500/30">
              <Trophy className="w-5 h-5 text-white drop-shadow" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Análisis y Logros</p>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight leading-tight">Tus Logros</h2>
            </div>
          </div>

          {/* Right: circle progress */}
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="7" fill="none" className="text-purple-100 dark:text-gray-700" />
              <motion.circle
                cx="40" cy="40" r="32"
                stroke="#a855f7"
                strokeWidth="7"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="201.06"
                initial={{ strokeDashoffset: 201.06 }}
                animate={{ strokeDashoffset: 201.06 - (201.06 * overallProgress) / 100 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                style={{ filter: 'drop-shadow(0 0 5px #a855f788)' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-gray-900 dark:text-white leading-none">{Math.round(overallProgress)}%</span>
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 tracking-tight">{unlockedCount}/{totalCount}</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 relative">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Progreso total</span>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 tracking-tight">{unlockedCount} de {totalCount} desbloqueados</span>
          </div>
          <div className="h-1.5 rounded-full bg-purple-100 dark:bg-gray-700 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </div>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 opacity-60" />
      </motion.div>

      {/* ── Achievement cards ── */}
      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.3 }}
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            className={`
              relative overflow-hidden rounded-2xl p-4
              border transition-all duration-300
              backdrop-blur-sm
              ${achievement.unlocked
                ? 'bg-gradient-to-br from-yellow-50 to-orange-50/60 dark:bg-none dark:bg-gray-800/90 border-yellow-200 dark:border-yellow-500/30 shadow-md shadow-yellow-500/10 dark:shadow-black/30 hover:shadow-lg'
                : 'bg-gradient-to-br from-slate-50 to-gray-100/60 dark:bg-none dark:bg-gray-800/70 border-gray-200 dark:border-gray-700/50 shadow-sm dark:shadow-black/20 hover:shadow-md opacity-80 hover:opacity-100'
              }
            `}
          >
            {/* Glow for unlocked */}
            {achievement.unlocked && (
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-0 dark:opacity-10 bg-gradient-to-br from-yellow-400 to-orange-400 blur-2xl pointer-events-none" />
            )}

            <div className="flex items-start gap-4 relative">
              {/* Emoji icon */}
              <div className={`
                text-3xl flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl
                ${achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border border-yellow-200 dark:border-yellow-700/40'
                  : 'bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600/40 grayscale opacity-50'
                }
              `}>
                {achievement.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className={`font-bold tracking-tight leading-tight ${
                    achievement.unlocked
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {achievement.title}
                  </h3>
                  {achievement.unlocked && (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0 ml-2" />
                  )}
                </div>

                <p className={`text-xs font-medium tracking-tight mb-2 ${
                  achievement.unlocked
                    ? 'text-gray-600 dark:text-gray-300'
                    : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {achievement.description}
                </p>

                {/* Progress bar for locked */}
                {!achievement.unlocked && achievement.progress !== undefined && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">Progreso</span>
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 tracking-tight">
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(achievement.progress / (achievement.maxProgress || 1)) * 100}%` }}
                        transition={{ duration: 0.6, delay: index * 0.06 }}
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                      />
                    </div>
                  </div>
                )}

                {/* Unlocked badge */}
                {achievement.unlocked && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700/40 px-2 py-0.5 rounded-lg tracking-tight">
                    ✓ Desbloqueado
                  </span>
                )}
              </div>
            </div>

            {/* Bottom accent line — only unlocked */}
            {achievement.unlocked && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-60" />
            )}
          </motion.div>
        ))}
      </div>

      {/* ── Motivational card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        whileHover={{ y: -3, transition: { duration: 0.2 } }}
        className="
          relative overflow-hidden rounded-2xl p-5
          bg-gradient-to-br from-blue-50 to-indigo-50/40
          dark:bg-none dark:bg-gray-800/90
          border border-blue-200 dark:border-blue-500/30
          shadow-lg shadow-blue-500/10 dark:shadow-black/40
          hover:shadow-xl transition-all duration-300
          backdrop-blur-sm
        "
      >
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-0 dark:opacity-10 bg-gradient-to-br from-blue-500 to-indigo-500 blur-3xl pointer-events-none" />

        <div className="flex items-start gap-3 relative">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/30 flex-shrink-0">
            <Zap className="w-4 h-4 text-white drop-shadow" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white tracking-tight mb-1">¡Sigue así!</h3>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-tight leading-relaxed">
              Estás a solo 2 logros de alcanzar el nivel de Experto en Finanzas.
              Completa tu meta de ahorro para desbloquear tu próximo logro.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-60" />
      </motion.div>

    </div>
  );
}