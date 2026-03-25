import { motion } from 'motion/react';
import { BookOpen, HelpCircle, X } from 'lucide-react';
import { useState } from 'react';

interface HelpPanelProps {
  section: 'home' | 'stats' | 'goals' | 'profile';
}

export function HelpPanel({ section }: HelpPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const helpContent: Record<string, { title: string; tips: string[] }> = {
    home: {
      title: 'Panel de Control',
      tips: [
        'Las tarjetas superiores muestran tu balance, ingresos y gastos del mes actual',
        'El gráfico te ayuda a visualizar tus tendencias financieras',
        'Usa el botón + para agregar transacciones rápidamente',
        'Revisa tu salud financiera para obtener recomendaciones personalizadas'
      ]
    },
    stats: {
      title: 'Análisis y Logros',
      tips: [
        'Desbloquea logros al cumplir metas financieras',
        'Los badges motivan hábitos saludables de ahorro',
        'Completa rachas para ganar recompensas especiales',
        'Comparte tus logros con amigos para mayor motivación'
      ]
    },
    goals: {
      title: 'Metas de Ahorro',
      tips: [
        'Define metas específicas con montos y fechas límite',
        'El sistema calcula automáticamente cuánto debes ahorrar mensualmente',
        'Las barras de progreso te muestran qué tan cerca estás',
        'Recibe alertas cuando te desvíes de tus objetivos'
      ]
    },
    profile: {
      title: 'Perfil y Configuración',
      tips: [
        'Personaliza tu experiencia ajustando preferencias',
        'Configura notificaciones y recordatorios',
        'Gestiona tus categorías personalizadas',
        'Conecta tu cuenta bancaria para sincronización automática'
      ]
    }
  };

  const content = helpContent[section];

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-24 lg:bottom-8 z-30 p-4 bg-blue-600 dark:bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        aria-label="Ayuda"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {/* Help Panel */}
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Ayuda
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Section Title */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {content.title}
                  </h3>
                  <div className="h-1 w-16 bg-blue-600 dark:bg-blue-500 rounded-full" />
                </div>

                {/* Tips */}
                <div className="space-y-4">
                  {content.tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {tip}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Acciones Rápidas
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-colors">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                        Ver tutorial interactivo
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                        Aprende a usar la app en 2 minutos
                      </p>
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Atajos de teclado
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Ctrl+N para agregar, Ctrl+K para buscar
                      </p>
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Contactar soporte
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        ¿Tienes dudas? Estamos aquí para ayudarte
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
