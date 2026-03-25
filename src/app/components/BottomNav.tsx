import { motion } from 'motion/react';
import { Home, TrendingUp, Target, Plus } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onQuickAdd: () => void;
}

export function BottomNav({ activeTab, onTabChange, onQuickAdd }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'stats', icon: TrendingUp, label: 'Análisis' },
    { id: 'goals', icon: Target, label: 'Metas' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40 safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 px-4 py-2 relative"
            >
              <Icon
                className={`w-6 h-6 transition-colors ${isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 dark:text-gray-500'
                  }`}
              />
              <span
                className={`text-xs font-medium transition-colors ${isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                  }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onQuickAdd}
        className="absolute left-1/2 -translate-x-1/2 -top-7 w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 rounded-full shadow-lg flex items-center justify-center"
      >
        <Plus className="w-8 h-8 text-white" />
      </motion.button>
    </nav>
  );
}
