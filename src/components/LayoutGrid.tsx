import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { OptionButton } from './buttons/OptionButton';
import { useGridLogic } from '../lib/gridLogic';
import type { ProductOption } from '../types';

interface LayoutGridProps {
  categoryId: string | null;
  productId: string | null;
}

// Create array of positions 1-56 for 8 rows of 7 columns
const GRID_POSITIONS = Array.from({ length: 56 }, (_, i) => i + 1);

export function LayoutGrid({ categoryId, productId }: LayoutGridProps) {
  const [counters, setCounters] = React.useState<Record<number, number>>({});

  // Reset counters when product changes
  React.useEffect(() => {
    setCounters({});
  }, [productId]);

  const { data: options } = useQuery({
    queryKey: ['product-options', productId],
    queryFn: async () => {
      if (!productId) return [];
      
      const { data, error } = await supabase
        .from('product_options')
        .select('*')
        .eq('product_id', productId)
        .order('grid_position');
      
      if (error) throw error;
      return data as ProductOption[];
    },
    enabled: !!productId,
  });

  const updateCounter = (position: number, increment: boolean) => {
    setCounters(prev => {
      const current = prev[position] || 0;
      const next = increment ? current + 1 : Math.max(0, current - 1);
      return {
        ...prev,
        [position]: next
      }
    });
  };

  // Create a map of grid positions to options for efficient lookup
  const optionsByPosition = React.useMemo(() => {
    return new Map(options?.map(opt => [opt.grid_position, opt]) || []);
  }, [options]);

  const { isGridVisible, message, visibleOptions } = useGridLogic({
    categoryId,
    productId,
    options,
    counters,
  });

  if (!isGridVisible) {
    return (
      <div className="h-[680px] flex items-center justify-center text-gray-500">
        {message}
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 160px)',
      gap: '20px',
      width: 'fit-content'
    }}>
      {GRID_POSITIONS.map((position) => {
        const option = optionsByPosition.get(position);
        return (
          <OptionButton
            key={position}
            option={option || {
              id: '',
              product_id: '',
              name: '',
              price: 0,
              type: 1,
              option_type: 'variation',
              grid_position: position
            }}
            position={position}
            count={counters[position] || 0}
            onIncrement={() => updateCounter(position, true)}
            onDecrement={() => updateCounter(position, false)}
          />
        );
      })}
    </div>
  );
}
