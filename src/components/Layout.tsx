import React from 'react';
import { CategoryList } from './CategoryList';
import { Products } from './Products';
import { BurgerGrid } from './BurgerGrid';
import { FooterTrx } from './FooterTrx';
import { Cart } from './Cart';
import { Numpad } from './Numpad';

export function Layout() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<string | null>(null);

  return (
    <div className="h-[1020px] w-[1930px] relative">
      <div className="absolute inset-0 bg-gray-100" />

        {/* Left column - Categories */}
        <div className="absolute left-5 top-5 w-[260px]">
          <CategoryList
            selectedId={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Products */}
        <div className="absolute left-[300px] top-5 right-5">
          <Products
            categoryId={selectedCategory}
            selectedId={selectedProduct}
            onSelect={setSelectedProduct}
          />
        </div>

        {/* Main Grid */}
        <div className="absolute left-[285px] top-[105px] w-[1140px]">
          <BurgerGrid
            productId={selectedProduct}
          />
        </div>

        {/* Cart */}
        <div className="absolute left-[1560px] top-[20px] w-[335px]">
          <Cart />
        </div>

        {/* Numpad */}
        <div className="absolute left-[1560px] top-[520px] bottom-[50px]">
          <Numpad />
        </div>

        {/* Footer */}
        <div className="absolute left-5 bottom-5">
          <FooterTrx />
        </div>
    </div>
  );
}
