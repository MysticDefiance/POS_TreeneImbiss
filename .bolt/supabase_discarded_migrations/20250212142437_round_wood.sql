/*
  # Ensure drink choice option exists

  1. Changes
    - Check if "Getränkewahl" option exists at position 9
    - If not, create it
    - If it exists but is wrong, update it
*/

DO $$ 
DECLARE
  burger_id text;
  option_counter integer;
  existing_option_id text;
BEGIN
  -- Get the Cheeseburger product ID
  SELECT id INTO burger_id
  FROM products
  WHERE name = 'Cheeseburger';

  -- Check if option already exists at position 9
  SELECT id INTO existing_option_id
  FROM product_options
  WHERE product_id = burger_id AND grid_position = 9;

  IF existing_option_id IS NULL THEN
    -- Get the next option counter
    SELECT COALESCE(MAX(CAST(SUBSTRING(id FROM 2) AS integer)), 0) + 1
    INTO option_counter
    FROM product_options;

    -- Insert new option
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
  ELSE
    -- Update existing option to ensure correct values
    UPDATE product_options
    SET 
      name = 'Getränkewahl',
      option_type = 'variation',
      type = 1
    WHERE id = existing_option_id;
  END IF;
END $$;
