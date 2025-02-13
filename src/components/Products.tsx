import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { ProductButton } from './buttons/ProductButton';
import type { Product } from '../types';

interface ProductsProps {
  categoryId: string | null;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function Products({ categoryId, selectedId, onSelect }: ProductsProps) {
  const [counters, setCounters] = React.useState<Record<string, number>>({});

  const { data: products } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: async () => {
      if (!categoryId) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryId)
        .order('sort_order');
      
      if (error) throw error;
      return data as Product[];
    },
    enabled: !!categoryId,
  });

  // Reset counters when category changes
  React.useEffect(() => {
    setCounters({});
  }, [categoryId]);

  const updateCounter = (id: string, increment: boolean) => {
    setCounters(prev => {
      const current = prev[id] || 0;
      const next = increment ? current + 1 : Math.max(0, current - 1);
      return {
        ...prev,
        [id]: next
      }
    });
  };

  return (
    <div className="flex gap-5">
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 160px)',
        gap: '20px',
        width: 'fit-content'
      }}>
        {products?.map((product) => (
          <ProductButton
            key={product.id}
            product={product}
            isSelected={selectedId === product.id}
            count={counters[product.id] || 0}
            onSelect={() => onSelect(product.id)}
            onIncrement={() => updateCounter(product.id, true)}
            onDecrement={() => updateCounter(product.id, false)}
          />
        ))}
      </div>
    </div>
  );
}
