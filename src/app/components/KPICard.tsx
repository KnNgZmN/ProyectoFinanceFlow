import { motion } from 'motion/react';
import { LucideIcon, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Tooltip } from './Tooltip';
 
interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  color: string;
  tooltip?: string;
  isLoading?: boolean;
}
 
// Map color class to gradient and glow styles
const colorMap: Record<string, { gradient: string; glow: string; lightBg: string; border: string; darkBorder: string }> = {
  'bg-blue-600': {
    gradient: 'from-blue-500 to-blue-700',
    glow: 'shadow-blue-500/30',
    lightBg: 'from-blue-50 to-blue-100/60',
    border: 'border-blue-200',
    darkBorder: 'dark:border-blue-500/30',
  },
  'bg-green-600': {
    gradient: 'from-green-500 to-green-700',
    glow: 'shadow-green-500/30',
    lightBg: 'from-green-50 to-green-100/60',
    border: 'border-green-200',
    darkBorder: 'dark:border-green-500/30',
  },
  'bg-orange-600': {
    gradient: 'from-orange-500 to-orange-700',
    glow: 'shadow-orange-500/30',
    lightBg: 'from-orange-50 to-orange-100/60',
    border: 'border-orange-200',
    darkBorder: 'dark:border-orange-500/30',
  },
  'bg-red-600': {
    gradient: 'from-red-500 to-red-700',
    glow: 'shadow-red-500/30',
    lightBg: 'from-red-50 to-red-100/60',
    border: 'border-red-200',
    darkBorder: 'dark:border-red-500/30',
  },
};
 
export function KPICard({ title, value, change, icon: Icon, color, tooltip, isLoading = false }: KPICardProps) {
  const isPositive = change >= 0;
  const colorStyle = colorMap[color] ?? colorMap['bg-blue-600'];
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`
        relative overflow-hidden rounded-2xl p-5 sm:p-6
        bg-gradient-to-br ${colorStyle.lightBg}
        dark:bg-none dark:bg-gray-800/90
        border ${colorStyle.border} ${colorStyle.darkBorder}
        shadow-lg ${colorStyle.glow}
        dark:shadow-black/40
        hover:shadow-xl
        transition-all duration-300
        backdrop-blur-sm
      `}
    >
      {/* Loading bar */}
      {isLoading && (
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5 }}
          className={`absolute top-0 left-0 h-0.5 bg-gradient-to-r ${colorStyle.gradient}`}
        />
      )}
 
      {/* Decorative background circle — visible in dark mode */}
      <div className={`
        absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-0 dark:opacity-10
        bg-gradient-to-br ${colorStyle.gradient}
        blur-2xl pointer-events-none
      `} />
 
      {/* Top row: icon + badge */}
      <div className="flex items-start justify-between mb-4">
        {/* Icon with gradient background */}
        <div className={`
          relative p-2.5 sm:p-3 rounded-xl
          bg-gradient-to-br ${colorStyle.gradient}
          shadow-md ${colorStyle.glow}
        `}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow" />
          {/* Subtle pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${colorStyle.gradient} opacity-40`}
          />
        </div>
 
        {/* Change badge */}
        <span
          className={`
            text-xs sm:text-sm px-2.5 py-1 rounded-lg font-semibold
            flex items-center gap-1
            ${isPositive
              ? 'bg-green-100 text-green-700 border border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700/50'
              : 'bg-red-100 text-red-700 border border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700/50'
            }
          `}
        >
          {isPositive
            ? <TrendingUp className="w-3.5 h-3.5" />
            : <TrendingDown className="w-3.5 h-3.5" />
          }
          {isPositive ? '+' : ''}{change}%
        </span>
      </div>
 
      {/* Bottom row: title + value */}
      <div className="space-y-1">
        <h3 className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          <span className="truncate">{title}</span>
          {tooltip && (
            <Tooltip content={tooltip}>
              <Info className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 cursor-help flex-shrink-0" />
            </Tooltip>
          )}
        </h3>
 
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight truncate leading-tight">
          {value}
        </p>
 
        <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
          <span className={`inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colorStyle.gradient}`} />
          vs. mes anterior
        </p>
      </div>
 
      {/* Bottom color accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colorStyle.gradient} opacity-60`} />
    </motion.div>
  );
}