/*
  # Reorganize menu structure

  1. Changes
    - Move "Getränke" to row 9 as a header
    - Move "mit Schorle" to position 16
    - Move "mit Bier" to position 23
    - Move "mit Weizen" to position 30
    - Move "Saucen" menu and all sauce options to row 10
    - Move "Kundenwunsch" menu and all custom options to row 11

  2. Security
    - Maintains existing RLS policies
*/

DO $$ 
DECLARE
  burger_id text;
  option_counter integer := 1;
BEGIN
  -- Get the Cheeseburger product ID
  SELECT id INTO burger_id
  FROM products
  WHERE name = 'Cheeseburger';

  -- Delete existing options for this product
  DELETE FROM product_options 
  WHERE product_id = burger_id;

  -- Insert options with exact grid positions and generated IDs
  INSERT INTO product_options (
    id,
    product_id,
    name,
    option_type,
    type,
    grid_position
  ) VALUES
    -- Row 1 (1-7)
    ('O' || LPAD(option_counter::text, 3, '0'), burger_id, 'Einzeln', 'variation', 1, 1),
    ('O' || LPAD((option_counter + 1)::text, 3, '0'), burger_id, 'im Menü', 'variation', 1, 2),
    
    -- Row 9 (57-63) - Drinks header
    ('O' || LPAD((option_counter + 2)::text, 3, '0'), burger_id, 'Getränke', 'variation', 1, 57),
    
    -- Drink options in their new positions
    ('O' || LPAD((option_counter + 3)::text, 3, '0'), burger_id, 'mit Schorle', 'variation', 2, 16),
    ('O' || LPAD((option_counter + 4)::text, 3, '0'), burger_id, 'mit Bier', 'variation', 2, 23),
    ('O' || LPAD((option_counter + 5)::text, 3, '0'), burger_id, 'mit Weizen', 'variation', 2, 30),
    
    -- Row 10 (64-70) - Sauces
    ('O' || LPAD((option_counter + 6)::text, 3, '0'), burger_id, 'Saucen', 'variation', 1, 64),
    ('O' || LPAD((option_counter + 7)::text, 3, '0'), burger_id, 'Mayonnaise', 'variation', 3, 65),
    ('O' || LPAD((option_counter + 8)::text, 3, '0'), burger_id, 'Ketchup', 'variation', 3, 66),
    ('O' || LPAD((option_counter + 9)::text, 3, '0'), burger_id, 'Remoulade', 'variation', 3, 67),
    ('O' || LPAD((option_counter + 10)::text, 3, '0'), burger_id, 'Süss-Sauer', 'variation', 3, 68),
    ('O' || LPAD((option_counter + 11)::text, 3, '0'), burger_id, 'Curry', 'variation', 3, 69),
    ('O' || LPAD((option_counter + 12)::text, 3, '0'), burger_id, 'Barbecuesauce', 'variation', 3, 70),
    
    -- Row 11 (71-77) - Custom options
    ('O' || LPAD((option_counter + 13)::text, 3, '0'), burger_id, 'Kundenwunsch', 'variation', 1, 71),
    ('O' || LPAD((option_counter + 14)::text, 3, '0'), burger_id, 'ohne Senf', 'variation', 3, 72),
    ('O' || LPAD((option_counter + 15)::text, 3, '0'), burger_id, 'ohne Gurken', 'variation', 3, 73),
    ('O' || LPAD((option_counter + 16)::text, 3, '0'), burger_id, 'ohne Käse', 'variation', 3, 74),
    ('O' || LPAD((option_counter + 17)::text, 3, '0'), burger_id, 'ohne Zwiebeln', 'variation', 3, 75),
    ('O' || LPAD((option_counter + 18)::text, 3, '0'), burger_id, 'ohne Salat', 'variation', 3, 76);
END $$;
