import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { ProductOption } from '../types';

interface ProductOptionsProps {
  productId: string | null;
}

export function ProductOptions({ productId }: ProductOptionsProps) {
  const { data: options } = useQuery({
    queryKey: ['product-options', productId],
    queryFn: async () => {
      if (!productId) return [];
      
      const { data, error } = await supabase
        .from('product_options')
        .select('*')
        .eq('product_id', productId)
        .order('sort_order');
      
      if (error) throw error;
      return data as ProductOption[];
    },
    enabled: !!productId,
  });

  return (
    <div className="relative grid grid-cols-8 gap-5">
      {options?.map((option) => (
        <button
          key={option.id}
          className="h-[80px] bg-white rounded-lg p-4 hover:bg-mint-50"
        >
          <div className="text-sm">{option.name}</div>
          {option.price > 0 && (
            <div className="text-xs mt-1">
              +{(option.price / 100).toFixed(2)} €
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
