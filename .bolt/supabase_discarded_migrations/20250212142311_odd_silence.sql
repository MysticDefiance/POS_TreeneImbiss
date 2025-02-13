/*
  # Add drink choice option

  1. Changes
    - Add "Getränkewahl" option at grid position 9
*/

DO $$ 
DECLARE
  burger_id text;
  option_counter integer;
BEGIN
  -- Get the Cheeseburger product ID
  SELECT id INTO burger_id
  FROM products
  WHERE name = 'Cheeseburger';

  -- Get the next option counter
  SELECT COALESCE(MAX(CAST(SUBSTRING(id FROM 2) AS integer)), 0) + 1
  INTO option_counter
  FROM product_options;

  -- Insert Getränkewahl option at grid position 9
  INSERT INTO product_options (
    id,
    product_id,
    name,
    option_type,
    type,
    grid_position
  ) VALUES (
    'O' || LPAD(option_counter::text, 3, '0'),
    burger_id,
    'Getränkewahl',
    'variation',
    1,
    9
  );
END $$;
