/*
  # Fix grid positions for burger options

  1. Changes
    - Update grid positions for drink options to match UI layout
    - Ensure "mit Bier" is at position 10 instead of 17
    - Adjust related positions for consistency

  2. Details
    - Move "mit Bier" from position 17 to 10
    - Update other drink-related positions
*/

DO $$ 
DECLARE
  burger_id text;
BEGIN
  -- Get the Cheeseburger product ID
  SELECT id INTO burger_id
  FROM products
  WHERE name = 'Cheeseburger';

  -- Update grid positions for drink options
  UPDATE product_options
  SET grid_position = 10
  WHERE product_id = burger_id AND name = 'mit Bier';

  UPDATE product_options
  SET grid_position = 9
  WHERE product_id = burger_id AND name = 'mit Schorle';

  UPDATE product_options
  SET grid_position = 17
  WHERE product_id = burger_id AND name = 'mit Weizen';
END $$;
