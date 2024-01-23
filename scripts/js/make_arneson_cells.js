// TEST for arneson cells
function make_arneson_cells(hex_id){
    
    // We will need this to be grabbed by "which hex the user is actually zooming in on."
    // Do this for all hexes?

    //Array.from(document.getElementsByClassName('hex-center')).forEach((test_hex) => {
      
    test_hex = document.getElementById(hex_id);

    // Set the bounds of the imaginary box containing all the cells within the hex
    arneson_left = test_hex.offsetLeft;
    //arneson_left = 0;
    arneson_right = test_hex.offsetLeft + test_hex.offsetWidth;
    //arneson_right = 1000;
    arneson_top = test_hex.offsetTop;
    //arneson_top = 0;
    arneson_bottom = test_hex.offsetTop + test_hex.offsetHeight;
    //arneson_bottom = 1000;

    // Input the number of arneson cells in row, column...
    // Will need to change based on user-defined size of hex - 22 cells per 5-mile, 32 per 6-mile, x for 8-mile, 88 for 10-mile... 
    // potentially 1, 2 or 3 mile hexes.

    // **** different number needed for the total number of cells within the imaginary box. Some will be cut off and never rendered.
    
    // *** until hexes are pixel-perfect, arneson cells will not quite line up... nor will number of cells per col/row yield correct number.
    // *** also, the hex-shadow underneath & the 1.06 width will cause issues that will need to be corrected for (ie. setting box
    // such that it lines up with edges of hex correctly.) 
    
    // *** Then later we use CSS to trim cells that are on diagonal borders.
    number_arn_cells_in_col = 6;
    number_arn_cells_in_row = 6;  // will need to be a variable that changes depending on miles/hex.
    // 6 cells per col/row is close to 22 per 5-mile hex; 12 per col/row is close to the 88 per 10-mile hex.

    // Calculate total number of arneson cells.
    number_arneson_cells = number_arn_cells_in_col * number_arn_cells_in_row;

    cell_width = (arneson_right - arneson_left) / number_arn_cells_in_col;
    cell_height = (arneson_bottom - arneson_top) / number_arn_cells_in_row;

    // Because of CSS transformation (ie. our zoom), this rounding is crucial to having cells line up.
    cell_width = Math.round(cell_width);
    cell_height = Math.round(cell_height);

    for (i = 1; i <= number_arneson_cells; i++){
      x_coord = Math.ceil(i / number_arn_cells_in_row);
      y_coord = i % number_arn_cells_in_col;
      if (y_coord == 0) {y_coord = number_arn_cells_in_col;}
      //y_coord = (x_coord - 1) * number_arn_cells_in_col + i % number_arn_cells_in_col;

      this_cell_top = ((y_coord) * cell_height) - cell_height;
      //this_cell_top = arneson_top + ((y_coord - 1) * cell_height);
      //              arneson_top     y_coord - 1    cell_height
      //         ==   hex_anchor      transposed     spacer    

      this_cell_left = ((x_coord) * cell_width) - cell_width;
      //this_cell_top = (x_coord * cell_height);
      //this_cell_left = arneson_left + ((x_coord - 1) * cell_width);
      //this_cell_left = (y_coord * cell_width);

      const arneson_cell = document.createElement('div');
      arneson_cell.className = 'a-cell';
      //arneson_cell.style.visibility = 'none';
      arneson_cell.id = test_hex.id + '-a_cell_' + i
      arneson_cell.style.top = this_cell_top + 'px';
      arneson_cell.style.left = this_cell_left + 'px';
      arneson_cell.style.width = cell_width + 'px';
      arneson_cell.style.height = cell_height + 'px';
      arneson_cell.style.zIndex = 1000+i;
      //nudge_x =  0.5*flower_container_width
      test_hex.appendChild(arneson_cell);
    }
}

function clear_arneson_cells () {
  // This could be elaborated such that 'saved' cells are merely made invisible.
  // Currently it is called inside the add_mouse_ef and so only triggers when the user moves the mouse. 

  let total = Array.from(document.getElementsByClassName('hex-center'));
  total.forEach (hex => {
    let cells = Array.from(hex.getElementsByClassName('a-cell'));
    cells.forEach (cell => {
      cell.remove();
    });
  });
}