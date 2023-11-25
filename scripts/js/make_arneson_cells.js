// TEST for arneson cells
function make_arneson_cells(){
    test_hex = document.getElementById('hex_188');
    //arneson_left = test_hex.offsetLeft;
    arneson_left = 0;
    //arneson_right = test_hex.offsetLeft + test_hex.offsetWidth;
    arneson_right = 1000;
    //arneson_top = test_hex.offsetTop;
    arneson_top = 0;
    //arneson_bottom = test_hex.offsetTop + test_hex.offsetHeight;
    arneson_bottom = 1000;

    // Input the number of arneson cells in row, column...
    number_arn_cells_in_col = 6;
    number_arn_cells_in_row = 6;
    // Calculate total number of arneson cells.
    number_arneson_cells = number_arn_cells_in_col * number_arn_cells_in_row;

    cell_width = (arneson_right - arneson_left) / number_arneson_cells;
    cell_height = (arneson_bottom - arneson_top) / number_arneson_cells;

    for (i = 1; i <= number_arneson_cells; i++){
      
      x_coord = Math.ceil(i / number_arn_cells_in_col);
      y_coord = (x_coord - 1) * number_arn_cells_in_col + i % number_arn_cells_in_col;

      //this_cell_top = arneson_top + (i * cell_height);
      this_cell_top = (x_coord * cell_height);
      //this_cell_left = arneson_left + (i * cell_width);
      this_cell_left = (y_coord * cell_width);

      const arneson_cell = document.createElement('div');
      arneson_cell.className = 'a-cell';
      //arneson_cell.style.visibility = 'none';
      arneson_cell.id = test_hex.id + '-a_cell_' + i
      arneson_cell.style.top = this_cell_top + 'px';
      arneson_cell.style.left = this_cell_left + 'px';
      arneson_cell.style.width = cell_width + 'px';
      arneson_cell.style.height = cell_height + 'px';
      //nudge_x =  0.5*flower_container_width
      test_hex.appendChild(arneson_cell);
    }
  }