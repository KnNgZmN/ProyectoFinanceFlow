import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface ColProps {
  children: ReactNode;
  span?: number;
  spanMd?: number;
  spanLg?: number;
  spanXl?: number;
  className?: string;
}

export function Grid({ children, gap = 'md', className = '' }: GridProps) {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  return (
    <div className={`grid grid-cols-12 ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
}

export function Col({ children, span = 12, spanMd, spanLg, spanXl, className = '' }: ColProps) {
  const getColSpan = (columns: number) => {
    const colMap: Record<number, string> = {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      5: 'col-span-5',
      6: 'col-span-6',
      7: 'col-span-7',
      8: 'col-span-8',
      9: 'col-span-9',
      10: 'col-span-10',
      11: 'col-span-11',
      12: 'col-span-12'
    };
    return colMap[columns] || 'col-span-12';
  };

  const getColSpanMd = (columns: number) => {
    const colMap: Record<number, string> = {
      1: 'md:col-span-1',
      2: 'md:col-span-2',
      3: 'md:col-span-3',
      4: 'md:col-span-4',
      5: 'md:col-span-5',
      6: 'md:col-span-6',
      7: 'md:col-span-7',
      8: 'md:col-span-8',
      9: 'md:col-span-9',
      10: 'md:col-span-10',
      11: 'md:col-span-11',
      12: 'md:col-span-12'
    };
    return colMap[columns] || '';
  };

  const getColSpanLg = (columns: number) => {
    const colMap: Record<number, string> = {
      1: 'lg:col-span-1',
      2: 'lg:col-span-2',
      3: 'lg:col-span-3',
      4: 'lg:col-span-4',
      5: 'lg:col-span-5',
      6: 'lg:col-span-6',
      7: 'lg:col-span-7',
      8: 'lg:col-span-8',
      9: 'lg:col-span-9',
      10: 'lg:col-span-10',
      11: 'lg:col-span-11',
      12: 'lg:col-span-12'
    };
    return colMap[columns] || '';
  };

  const getColSpanXl = (columns: number) => {
    const colMap: Record<number, string> = {
      1: 'xl:col-span-1',
      2: 'xl:col-span-2',
      3: 'xl:col-span-3',
      4: 'xl:col-span-4',
      5: 'xl:col-span-5',
      6: 'xl:col-span-6',
      7: 'xl:col-span-7',
      8: 'xl:col-span-8',
      9: 'xl:col-span-9',
      10: 'xl:col-span-10',
      11: 'xl:col-span-11',
      12: 'xl:col-span-12'
    };
    return colMap[columns] || '';
  };

  const classes = [
    getColSpan(span),
    spanMd && getColSpanMd(spanMd),
    spanLg && getColSpanLg(spanLg),
    spanXl && getColSpanXl(spanXl),
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
}
