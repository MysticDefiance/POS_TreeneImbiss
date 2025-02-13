import React from 'react';
import { ShoppingCart } from 'lucide-react';

export function Cart() {
  return (
    <div className="h-[480px] bg-white rounded-lg p-5">
      <div className="flex items-center gap-3 mb-4">
        <ShoppingCart className="w-5 h-5" />
        <h2 className="font-medium">Warenkorb</h2>
      </div>
      
      <div className="h-[calc(480px-4rem)] overflow-auto">
        {/* Cart items will go here */}
      </div>
    </div>
  );
}
