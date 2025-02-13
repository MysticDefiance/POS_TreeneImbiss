import type { ProductOption } from '../types';

export interface GridState {
  categoryId: string | null;
  productId: string | null;
  options: ProductOption[];
  counters: Record<number, number>;
}

export interface GridLogicProps {
  categoryId: string | null;
  productId: string | null;
  options: ProductOption[] | undefined;
  counters: Record<number, number>;
}

export function useGridLogic({ categoryId, productId, options, counters }: GridLogicProps) {
  // Check if grid should be visible
  const isGridVisible = Boolean(categoryId && productId);

  // Get message based on state
  const getMessage = () => {
    if (!categoryId) return 'Bitte Kategorie auswählen';
    if (!productId) return 'Bitte ein Produkt auswählen';
    return null;
  };

  // Filter active options based on relationships and state
  const getVisibleOptions = () => {
    if (!options) return [];
    
    // Filter based on option type and relationships
    return options.filter(option => {
      // Always show parent options
      if (option.type === 1) return true;
      
      // Show children if parent is selected
      if (option.type === 2) {
        const parentOption = options.find(o => o.id === option.parent_id);
        return parentOption && counters[parentOption.grid_position] > 0;
      }
      
      // Show counter options based on state
      if (option.type === 3 || option.type === 4) {
        return true;
      }
      
      return false;
    });
  };

  return {
    isGridVisible,
    message: getMessage(),
    visibleOptions: getVisibleOptions(),
  };
}
