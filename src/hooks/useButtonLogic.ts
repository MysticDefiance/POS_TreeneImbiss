import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { ProductOption } from '../types';

export function useButtonLogic(productId: string | null) {
  const [visiblePositions, setVisiblePositions] = React.useState<Set<number>>(new Set([1, 2]));
  const [activeButtons, setActiveButtons] = React.useState<Set<number>>(new Set());

  // Get all options for the current product
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

  // Track parent-child relationships
  const parentChildMap = React.useMemo(() => {
    const map = new Map<number, number[]>();
    
    // Getränkewahl children (9)
    map.set(9, [16, 23, 30, 37, 44, 51]);
    
    // Saucen children (11)
    map.set(10, [17, 24, 31, 38, 45, 52]);
    
    // Kundenwunsch children (12)
    map.set(11, [18, 25, 32, 39, 46, 53]);
    
    // Andere Sauce children (32)
    map.set(32, [33, 40, 47, 54]);
    
    return map;
  }, []); // No dependencies needed as the map is static

  // Reset states when product changes
  React.useEffect(() => {
    setVisiblePositions(new Set([1, 2]));
    setActiveButtons(new Set());
  }, [productId]);

  const handleButtonClick = React.useCallback((position: number, clickedOption: ProductOption) => {
    if (!options) return;
    
    const isParent = parentChildMap.has(position);
    const parentPosition = Array.from(parentChildMap.entries())
      .find(([_, children]) => children.includes(position))?.[0];

    // Handle "im Menü" click (position 2)
    if (position === 2) {
      if (activeButtons.has(position)) {
        // Only deactivate if no children are active
        const hasActiveChildren = [9, 10, 11, 12].some(pos => 
          activeButtons.has(pos) || 
          parentChildMap.get(pos)?.some(childPos => activeButtons.has(childPos))
        );
        
        if (!hasActiveChildren) {
          setActiveButtons(prev => {
            const next = new Set(prev);
            next.delete(position);
            return next;
          });
          
          setVisiblePositions(prev => {
            const next = new Set(prev);
            [9, 10, 11, 12].forEach(pos => next.delete(pos));
            return next;
          });
        }
      } else {
        setActiveButtons(prev => {
          const next = new Set(prev);
          next.add(position);
          return next;
        });
        
        setVisiblePositions(prev => {
          const next = new Set(prev);
          [9, 10, 11, 12].forEach(pos => {
            if (options.find(opt => opt.grid_position === pos)?.name) {
              next.add(pos);
            }
          });
          return next;
        });
      }
      return;
    }

    // Handle parent buttons (Getränkewahl, Saucen, Kundenwunsch)
    if (isParent) {
      // Wenn ein anderer Parent-Button geklickt wird, prüfe und schließe andere Parent-Buttons
      const parentPositions = [9, 10, 11];

      parentPositions.forEach(parentPos => {
        if (parentPos !== position && activeButtons.has(parentPos)) {
          // Prüfe, ob der andere Parent aktive Kinder hat
          const hasActiveChildren = parentChildMap.get(parentPos)?.some(childPos => {
            const countElement = document.querySelector(`.pg${childPos}`)?.querySelector('[data-count]');
            const count = countElement ? parseInt(countElement.getAttribute('data-count') || '0') : 0;
            // Spezialfall: Position 32 (andere Sauce) gilt als aktives Kind für Kundenwunsch
            if (parentPos === 11 && childPos === 32) {
              return activeButtons.has(32);
            }
            return activeButtons.has(childPos) || count > 0;
          });

          // Wenn keine aktiven Kinder, schließe den Parent
          if (!hasActiveChildren) {
            setActiveButtons(prev => {
              const next = new Set(prev);
              next.delete(parentPos);
              return next;
            });

            setVisiblePositions(prev => {
              const next = new Set(prev);
              parentChildMap.get(parentPos)?.forEach(pos => next.delete(pos));
              return next;
            });
          }
        }
      });

      if (activeButtons.has(position)) {
        // Prüfen, ob Kinder aktiv sind oder Counter > 0 haben
        const hasActiveChildren = parentChildMap.get(position)?.some(childPos => {
          const countElement = document.querySelector(`.pg${childPos}`)?.querySelector('[data-count]');
          const count = countElement ? parseInt(countElement.getAttribute('data-count') || '0') : 0;
          // Spezialfall: Position 32 (andere Sauce) gilt als aktives Kind für Kundenwunsch
          if (position === 11 && childPos === 32) {
            return activeButtons.has(32);
          }
          return activeButtons.has(childPos) || count > 0;
        });
        
        if (hasActiveChildren) return;

        setActiveButtons(prev => {
          const next = new Set(prev);
          next.delete(position);
          return next;
        });
        
        setVisiblePositions(prev => {
          const next = new Set(prev);
          parentChildMap.get(position)?.forEach(pos => next.delete(pos));
          return next;
        });
      } else {
        setActiveButtons(prev => {
          const next = new Set(prev);
          next.add(position);
          return next;
        });
        
        setVisiblePositions(prev => {
          const next = new Set(prev);
          parentChildMap.get(position)?.forEach(pos => {
            if (options.find(opt => opt.grid_position === pos)?.name) {
              next.add(pos);
            }
          });
          return next;
        });
      }
      return;
    }

    // Handle child buttons
    if (parentPosition) {
      if (activeButtons.has(position)) {
        setActiveButtons(prev => {
          const next = new Set(prev);
          next.delete(position);
          return next;
        });
      } else {
        setActiveButtons(prev => {
          const next = new Set(prev);
          next.add(position);
          if (!next.has(parentPosition)) {
            next.add(parentPosition);
          }
          return next;
        });
      }
      return;
    }

    // Handle regular buttons
    if (activeButtons.has(position)) {
      setActiveButtons(prev => {
        const next = new Set(prev);
        next.delete(position);
        return next;
      });
    } else {
      setActiveButtons(prev => {
        const next = new Set(prev);
        next.add(position);
        return next;
      });
    }
  }, [options, parentChildMap, activeButtons]);

  // Effect to handle visibility when active states change
  React.useEffect(() => {
    if (!options) return;

    setVisiblePositions(prev => {
      const next = new Set(prev);
      
      // Always show base positions
      next.add(1);
      next.add(2);
      
      // Show menu row if active
      if (activeButtons.has(2)) {
        [9, 10, 11, 12].forEach(pos => {
          if (options.find(opt => opt.grid_position === pos)?.name) {
            next.add(pos);
          }
        });
      }
      
      // Show children of active parents
      Array.from(parentChildMap.entries()).forEach(([parent, children]) => {
        if (activeButtons.has(parent)) {
          children.forEach(child => {
            if (options.find(opt => opt.grid_position === child)?.name) {
              next.add(child);
            }
          });
        }
      });

      return next;
    });
  }, [activeButtons, options, parentChildMap]);

  return {
    visiblePositions,
    activeButtons,
    handleButtonClick,
  };
}
