/*
  # Add Cheeseburger options with specific grid positions
  
  1. Changes
    - Add options for Cheeseburger (P01) with exact grid positions
    - Each option is placed in its specific position in the 7x8 grid
    
  2. Notes
    - Grid positions match exactly with the provided layout
    - Empty positions are not included in the database
*/

DO $$ 
DECLARE
  burger_id text := 'P01';  -- Cheeseburger ID
BEGIN
  -- Delete existing options for this product
  DELETE FROM product_options 
  WHERE product_id = burger_id;

  -- Insert options with exact grid positions
  INSERT INTO product_options (
    product_id,
    name,
    option_type,
    grid_position
  ) VALUES
    -- Row 1
    (burger_id, 'Einzeln', 'variation', 1),
    (burger_id, 'im Menü', 'variation', 2),
    
    -- Row 2
    (burger_id, 'mit Schorle', 'variation', 8),
    (burger_id, 'mit Bier', 'variation', 9),
    (burger_id, 'Saucen', 'variation', 10),
    (burger_id, 'Kundenwunsch', 'variation', 11),
    
    -- Row 3
    (burger_id, 'mit Weizen', 'variation', 15),
    (burger_id, 'Mayonnaise', 'variation', 16),
    (burger_id, 'ohne Senf', 'variation', 17),
    
    -- Row 4
    (burger_id, 'Ketchup', 'variation', 22),
    (burger_id, 'ohne Gurken', 'variation', 24),
    
    -- Row 5
    (burger_id, 'Remoulade', 'variation', 29),
    (burger_id, 'andere Sauce', 'variation', 30),
    (burger_id, 'Big Mac Sauce', 'variation', 31),
    
    -- Row 6
    (burger_id, 'Süss-Sauer', 'variation', 36),
    (burger_id, 'ohne Käse', 'variation', 37),
    (burger_id, 'Tsatsiki', 'variation', 38),
    
    -- Row 7
    (burger_id, 'Curry', 'variation', 43),
    (burger_id, 'ohne Zwiebeln', 'variation', 44),
    (burger_id, 'Barbecuesauce', 'variation', 45),
    
    -- Row 8
    (burger_id, 'Peper-Relish', 'variation', 50),
    (burger_id, 'ohne Salat', 'variation', 51),
    (burger_id, 'Peper-Relish', 'variation', 52);
END $$;
