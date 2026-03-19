import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'motion/react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: any;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (href: string) => void;
}

export function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const Icon = item.icon;
          
          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              )}
              
              {isLast ? (
                <span className="flex items-center gap-1.5 text-gray-900 dark:text-gray-100 font-medium">
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => item.href && onNavigate?.(item.href)}
                  className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Hook to generate breadcrumbs based on current tab
export function useBreadcrumbs(activeTab: string) {
  const breadcrumbs: Record<string, BreadcrumbItem[]> = {
    home: [
      { label: 'Inicio', icon: Home }
    ],
    stats: [
      { label: 'Inicio', href: 'home', icon: Home },
      { label: 'Análisis y Logros' }
    ],
    goals: [
      { label: 'Inicio', href: 'home', icon: Home },
      { label: 'Metas de Ahorro' }
    ],
    profile: [
      { label: 'Inicio', href: 'home', icon: Home },
      { label: 'Perfil y Ajustes' }
    ]
  };

  return breadcrumbs[activeTab] || breadcrumbs.home;
}
