import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Category } from '../types';

interface CategoriesProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function Categories({ selectedId, onSelect }: CategoriesProps) {
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order');
      
      if (error) throw error;
      return data as Category[];
    },
  });

  return (
    <div className="flex flex-col gap-5">
      {categories?.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`
            h-[80px] w-[260px] px-4 rounded-lg font-medium
            ${selectedId === category.id
              ? 'bg-mint-500 text-white'
              : 'bg-white hover:bg-mint-50'
            }
          `}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
