import React from 'react';
import { GridButton } from './GridButton';
import type { ProductOption } from '../../types';

interface OptionButtonProps {
  option: ProductOption;
  active: boolean;
  position: number;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onClick?: () => void;
}

export function OptionButton({
  option,
  active,
  position,
  count,
  onIncrement,
  onDecrement,
  onClick
}: OptionButtonProps) {
  const isActive = active || count > 0;

  return (
    <div
      className={`
        h-[80px] w-[160px] rounded-lg flex items-center justify-center relative transition-colors
        ${option.name
          ? isActive
            ? 'bg-mint-500 text-white hover:bg-mint-600'
            : 'bg-white hover:bg-mint-50 cursor-pointer'
          : 'bg-white'
        }
      `}
      onClick={(e) => {
        e.stopPropagation();
        // Call onClick handler if provided
        onClick?.();
      }}
    >
      {option.name && (
        <GridButton
          option={option}
          position={position}
          count={count}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      )}
    </div>
  );
}
