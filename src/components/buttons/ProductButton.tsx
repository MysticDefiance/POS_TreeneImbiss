import React from 'react';
import { GridButton } from './GridButton';
import type { Product } from '../../types';

interface ProductButtonProps {
  product: Product;
  isSelected: boolean;
  count: number;
  onSelect: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function ProductButton({
  product,
  isSelected,
  count,
  onSelect,
  onIncrement,
  onDecrement
}: ProductButtonProps) {
  return (
    <button
      onClick={() => {
        if (product.type === 3 || product.type === 4) {
          onIncrement();
        } else {
          onSelect();
        }
      }}
      className={`
        h-[80px] rounded-lg relative
        ${isSelected && product.type <= 2
          ? 'bg-mint-500 text-white'
          : count > 0
            ? 'bg-mint-500 text-white'
            : 'bg-white hover:bg-mint-50'
        }`}
      style={{ width: '160px' }}
    >
      <GridButton
        option={{
          ...product,
          option_type: 'variation',
          grid_position: 0
        }}
        position={0}
        count={count}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </button>
  );
}
