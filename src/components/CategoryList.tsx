import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Category } from '../types';

interface CategoryListProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CategoryList({ selectedId, onSelect }: CategoryListProps) {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      console.log('Loaded categories:', data);
      return data as Category[];
    },
  });

  if (isLoading) {
    return (
      <div className="p-5">
        <div className="flex flex-col gap-5">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-[80px] w-[260px] rounded-lg bg-white/50 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={`relative flex items-center justify-center
              h-[80px] w-[260px] rounded-lg font-medium
              ${selectedId === category.id
                ? 'bg-mint-500 text-white hover:bg-mint-600'
                : 'bg-white hover:bg-mint-50'
              }
            `}
          >
            <span className="text-base">{category.name}</span>
          </button>
        ))}
    </div>
  );
}
