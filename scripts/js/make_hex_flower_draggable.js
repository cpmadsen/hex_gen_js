make_hex_flower_draggable = function(){
    let isDragging = false;
    let startPositionX, startPositionY;
    hex_flower_container = document.getElementById('hex_flower_container');
    let hexagon_petal = document.getElementsByClassName('hex-flower');

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

            // Are we near a border? If so, don't move.
            hex_boundary_left = document.getElementById('hex_flower_2');
            hex_boundary_top = document.getElementById('hex_flower_8');
            hex_boundary_bottom = document.getElementById('hex_flower_12');
            hex_boundary_right = document.getElementById('hex_flower_18');

            if(
              true
              //parseInt(hex_boundary_left.style.left) < -0.05*hex_flower_container.offsetWidth && 
              //parseInt(hex_boundary_top.style.top) < -0.05*hex_flower_container.offsetHeight && 
              //parseInt(hex_boundary_bottom.style.top + hex_boundary_bottom.offsetHeight) > hex_flower_container.offsetHeight && 
              //parseInt(hex_boundary_right.style.left + hex_boundary_bottom.offsetWidth) > hex_flower_container.offsetWidth 
              ){
              Array.from(hexagon_petal).forEach((hexagon_petal) => {
                  let left = parseFloat(hexagon_petal.style.left || 0);
                  let top = parseFloat(hexagon_petal.style.top || 0);
                  hexagon_petal.style.left = left + offsetX + 'px';
                  hexagon_petal.style.top = top + offsetY + 'px';
              });
              startPositionX = e.clientX;
              startPositionY = e.clientY;
              } else {
                // Bounce!
                //Array.from(hexagon_petal).forEach((hexagon_petal) => {
                //  let left = parseFloat(hexagon_petal.style.left || 0);
                //  let top = parseFloat(hexagon_petal.style.top || 0);
                //  hexagon_petal.style.left = left - 100 + 'px';
                //  hexagon_petal.style.top = top - 100 + 'px';
              //});
              //startPositionX = e.clientX;
              //startPositionY = e.clientY;
      }
    }
  });

    hex_flower_container.addEventListener('mouseup', () => {
        isDragging = false;
    });
}