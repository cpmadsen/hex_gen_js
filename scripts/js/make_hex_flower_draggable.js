make_hex_flower_draggable = function(){
    let isDragging = false;
    let startPositionX, startPositionY;
    hex_flower_container = document.getElementById('hex_flower_container');
    let hexagon_petal = document.getElementsByClassName('hex-flower');
    // Solve for hexagon flower petal container boundaries.
    left_boundary = 0.05*hex_flower_container.offsetWidth;
    top_boundary = 0.05*hex_flower_container.offsetHeight;
    bottom_boundary = 0.95*hex_flower_container.offsetHeight;
    right_boundary = 0.95*hex_flower_container.offsetWidth;

    boundary_hex_left = document.getElementById('hex_flower_2');
    boundary_hex_top = document.getElementById('hex_flower_8');
    boundary_hex_bottom = document.getElementById('hex_flower_12');
    boundary_hex_right = document.getElementById('hex_flower_18');

    hex_flower_container.addEventListener('mousedown', (e) => {
      console.log('mouse clicked');
        isDragging = true;
        startPositionX = e.clientX;
        startPositionY = e.clientY;
    });

    hex_flower_container.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let offsetX = e.clientX - startPositionX;
            let offsetY = e.clientY - startPositionY;

            Array.from(hexagon_petal).forEach((hexagon_petal) => {
              let left = parseFloat(hexagon_petal.style.left || 0);
              let top = parseFloat(hexagon_petal.style.top || 0);
              hexagon_petal.style.left = left + offsetX + 'px';
              hexagon_petal.style.top = top + offsetY + 'px';
            });
            startPositionX = e.clientX;
            startPositionY = e.clientY;
    }
  });

    hex_flower_container.addEventListener('mouseup', (e) => {
        isDragging = false;
        // If the user has moved outside the hexagon flower, bring us back inside.
        
        if(
          parseInt(boundary_hex_left.style.left) >= left_boundary
          ){
            amount_to_move_back = 1.5 * (parseInt(boundary_hex_left.style.left) - left_boundary);
            console.log('surpassed left boundary. Move back: ' + amount_to_move_back);

            Array.from(hexagon_petal).forEach((hexagon_petal) => {
              let left = parseFloat(hexagon_petal.style.left || 0);
              hexagon_petal.style.transition = 'left 1s';
              hexagon_petal.style.left = left - amount_to_move_back + 'px';
            });
          }
        if(
          parseInt(boundary_hex_top.style.top) >= top_boundary
          ){
            amount_to_move_back = 1.5 * (parseInt(boundary_hex_top.style.top) - top_boundary);
            console.log('surpassed top boundary. Move back: ' + amount_to_move_back);

            Array.from(hexagon_petal).forEach((hexagon_petal) => {
              let top = parseFloat(hexagon_petal.style.top || 0);
              hexagon_petal.style.transition = 'top 1s';
              hexagon_petal.style.top = top - amount_to_move_back + 'px';
            });
          }
        if(
          parseInt(boundary_hex_bottom.style.top) + (boundary_hex_bottom.offsetHeight) <= bottom_boundary
          ){
            amount_to_move_back = 1.5 * (bottom_boundary - parseInt(boundary_hex_bottom.style.top) - boundary_hex_bottom.offsetHeight);
            console.log('surpassed bottom boundary. Move back: ' + amount_to_move_back);

            Array.from(hexagon_petal).forEach((hexagon_petal) => {
              let top = parseFloat(hexagon_petal.style.top || 0);
              hexagon_petal.style.transition = 'top 1s';
              hexagon_petal.style.top = top + amount_to_move_back + 'px';
            });
          }
        if(
          parseInt(boundary_hex_right.style.left) + (boundary_hex_right.offsetWidth) <= right_boundary
          ){
            amount_to_move_back = 1.5 * (right_boundary - parseInt(boundary_hex_right.style.left) - boundary_hex_right.offsetWidth);
            console.log('surpassed right boundary. Move back: ' + amount_to_move_back);

            Array.from(hexagon_petal).forEach((hexagon_petal) => {
              let left = parseFloat(hexagon_petal.style.left || 0);
              hexagon_petal.style.transition = 'left 1s';
              hexagon_petal.style.left = left + amount_to_move_back + 'px';
            }); 
          }
          
        // Listen for the end of the 1s transition; once that's occurred,
        // remove this 1-second transition from the hexagon petals!
        hexagon_petal[0].addEventListener('transitionend', () => {
          // Remove the transition property from all hexagons
          Array.from(hexagon_petal).forEach((hexagon_petal) => {
            hexagon_petal.style.transition = '';
          });
        });
  });
};