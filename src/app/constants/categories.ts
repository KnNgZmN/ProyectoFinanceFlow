export interface Category {
  id: string;
  name: string;
  emoji: string;
  type: 'expense' | 'income';
}

export const CATEGORIES: Category[] = [
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

export const CATEGORY_NAMES = CATEGORIES.map(c => c.name);
