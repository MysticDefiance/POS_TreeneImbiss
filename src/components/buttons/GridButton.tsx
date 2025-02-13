import React from 'react';
import { Plus, Minus } from 'lucide-react';
import type { ProductOption } from '../../types';

interface CounterBadgeProps {
  count: number;
}

function CounterBadge({ count }: CounterBadgeProps) {
  if (count === 0) return null;
  return (
    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
      <span data-count={count}>{count}</span>
    </div>
  );
}

interface GridButtonProps {
  option: ProductOption;
  position: number;
  count?: number;
  onIncrement?: (position: number) => void;
  onDecrement?: (position: number) => void;
}

export function GridButton({ option, position, count = 0, onIncrement, onDecrement }: GridButtonProps) {
  switch (option.type) {
    case 1: // Menu name without price
      return (
        <div className="text-sm text-center px-2 select-none">
          {option.name}
        </div>
      );

    case 2: // Single item / Upgrade with title and price
      return (
        <div className="flex flex-col items-center gap-1 select-none">
          <div className="text-sm">{option.name}</div>
          <div className="text-xs text-gray-600">
            +{(option.price / 100).toFixed(2)} €
          </div>
        </div>
      );

    case 3: // +/- button with counter badge
    case 4: // +/- button with counter badge and price
      return (
        <div className="relative w-full h-full select-none">
          <CounterBadge count={count} />
          
          {/* Split button container */}
          <div className="absolute inset-0">
            {/* Left half (minus) */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                onDecrement?.(position);
              }}
              className="absolute left-0 top-0 w-1/2 h-full flex items-center justify-start pl-4 cursor-pointer hover:bg-gray-100/50 rounded-l-lg"
            />
            {/* Right half (plus) */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                onIncrement?.(position);
              }}
              className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-end pr-4 cursor-pointer hover:bg-gray-100/50 rounded-r-lg"
            />
          </div>
          
          {/* Vertical divider */}
          <div className="absolute left-1/2 top-2 bottom-2 w-px bg-gray-200 pointer-events-none" />
          
          {/* Icons */}
          <div className="absolute inset-0 pointer-events-none flex justify-between items-center px-4">
            <Minus className="w-4 h-4" />
            <Plus className="w-4 h-4" />
          </div>
          
          {/* Centered content */}
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
            <div className="text-sm whitespace-nowrap">{option.name}</div>
            {option.type === 4 && (
              <div className="text-xs text-gray-600">
                {(option.price / 100).toFixed(2)} €
              </div>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
}
