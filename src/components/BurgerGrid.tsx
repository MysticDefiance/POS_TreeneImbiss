import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { OptionButton } from './buttons/OptionButton';
import { useButtonLogic } from '../hooks/useButtonLogic';
import type { ProductOption } from '../types';

interface BurgerGridProps {
  productId: string | null;
}

export function BurgerGrid({ productId }: BurgerGridProps) {
  const [counters, setCounters] = React.useState<Record<number, number>>({});

  const { visiblePositions, activeButtons, handleButtonClick } = useButtonLogic(productId);

  // Reset state when product changes
  React.useEffect(() => {
    // Reset counters
    setCounters({});
  }, [productId]);

  const { data: options } = useQuery({
    queryKey: ['burger-options', productId],
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

  if (!productId) {
    return (
      <div className="h-[680px] flex items-center justify-center text-gray-500">
        Bitte wählen Sie einen Burger aus
      </div>
    );
  }

  // Create array of 8 rows
  const rows = Array.from({ length: 8 }, (_, rowIndex) => {
    // Create array of 7 cells for each row
    return Array.from({ length: 7 }, (_, colIndex) => {
      const position = rowIndex * 7 + colIndex + 1;
      const option = optionsByPosition.get(position);
      const visible = visiblePositions.has(position);

      return (
        <td 
          key={colIndex} 
          className={`pg${position} p-0 align-middle`}
          style={{ width: '160px', height: '80px' }}
        >
          {visible && option?.name && (
            <OptionButton
              option={option}
              active={activeButtons.has(position)}
              position={position}
              count={counters[position] || 0}
              onIncrement={() => updateCounter(position, true)}
              onDecrement={() => updateCounter(position, false)}
              onClick={() => handleButtonClick(position, option)}
            />
          )}
        </td>
      );
    });
  });

  return (
    <table className="border-separate" style={{ borderSpacing: '20px' }}>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className="h-[80px]">
            {row}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
