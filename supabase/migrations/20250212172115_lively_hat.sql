/*
  # Add menu visibility function

  1. Changes
    - Add function to handle menu option visibility
    - Function shows positions 9, 10, 11 when menu is clicked

  2. Security
    - Maintains existing RLS policies
*/

-- Create function to handle menu visibility
CREATE OR REPLACE FUNCTION handle_menu_visibility(
  p_product_id text,
  p_grid_position integer
) RETURNS void AS $$
BEGIN
  -- If position 2 ("im Menü") is clicked
  IF p_grid_position = 2 THEN
    -- Show menu-related options (positions 9, 10, 11)
    UPDATE product_options
    SET visible = true
    WHERE product_id = p_product_id
    AND grid_position IN (9, 10, 11);
  END IF;
END;
$$ LANGUAGE plpgsql;
