function add_button_effects(){
  // Hex map creation button
  make_hex_button.addEventListener('click', function() {

      numRows = number_hex_v.value;
      numCols = number_hex_h.value;
      container_height = document.getElementById('hex_gen_page').offsetHeight;
      container_width = document.getElementById('hex_gen_page').offsetWidth;

      make_hex_map(numRows, numCols, container_height, container_width, 
      make_clouds = true);
  });

  // Add randomized terrain button
  random_terrain_button.addEventListener('click', function() {

      numRows = number_hex_v.value;
      numCols = number_hex_h.value;
      container_height = document.getElementById('hex_gen_page').offsetHeight;
      container_width = document.getElementById('hex_gen_page').offsetWidth;

    select_terrain_type(
      // terrain_types = ['wooded', 'desert', 'mountain', 'swamp', 'open'],   // Open 'disruptor' morphs disabled for now
      terrain_types = ['wooded', 'desert', 'mountain', 'swamp'],
      // ideal/finished proportions = [0.2976, 0.0585, 0.1837, 0.0345, 0.4257871064],
      // terrain_proportions = [0.4418, 0.0685, 0.1937, 0.0345, 0.001], // we increase the earlier types because so many are overwritten                                                                          
      terrain_proportions = [0.4418, 0.0685, 0.1937, 0.0345], // we increase the earlier types because so many are overwritten                                                                         
      terrain_replace_list = [
        [],   // wooded first, replaces nothing 
        ['wooded'], // desert
        ['wooded','desert'], // mountain
        ['wooded','desert','mountain'], // 'swamp' replaces all
        // ['wooded','desert','mountain', 'swamp'] // optional open iteration breaks up some of the geomorphs unpredictably 
      ],
      elevation_classes = ['elevation_3', 'elevation_4', 'elevation_6', 'elevation_1', 'elevation_2'], // elevation classes for terrain types
      elevation_replacements = [
        [], // woods
        ['elevation_3'], // desert
        ['elevation_3','elevation_4'], // mountain
        ['elevation_3','elevation_4','elevation_6'], // swamp
        // ['elevation_3','elevation_4','elevation_6','elevation_1'] // optional open 

      ], 
      delay = 500 // this number is in milliseconds, and is totally optional; could be 0.
      );

  });

  // Add rivers button
  rivers_button.addEventListener('click', function() {
      numRows = number_hex_v.value;
      numCols = number_hex_h.value;
      container_height = document.getElementById('hex_gen_page').offsetHeight;
      container_width = document.getElementById('hex_gen_page').offsetWidth;
          
      apply_waterways( 250
        //delay = 250 // this number is in milliseconds, and is totally optional; could be 0.
      );
  });

  // Add features
  features_button.addEventListener('click', function() {
      
      numRows = number_hex_v.value;
      numCols = number_hex_h.value;
      container_height = document.getElementById('hex_gen_page').offsetHeight;
      container_width = document.getElementById('hex_gen_page').offsetWidth;
          
      apply_strongholds(
          on_which_terrain_types = ['wooded', 'wooded_hills', 'desert', 'mountain', 'swamp', 'open'],
          chance_for_SH = [0.0303030303, 0.01492537313, 0, 0.06140350877, 0.02173913043, 0], 
          chance_for_town = [0.002518891688, 0, 0, 0, 0, 0.01408450704],
        delay = 250 // this number is in milliseconds, and is totally optional; could be 0.
      );
  });
}

function enable_zoom_and_pan(){
  
  // Mouse click (up and down)

  document.getElementById('zoom_layer').addEventListener('mousedown', (event) => {
      mouse_clicked = true;
      initial_mousedown_x = event.clientX
      initial_mousedown_y = event.clientY
  });
  
  document.getElementById('zoom_layer').addEventListener('mouseup', (event) => {
      mouse_clicked = false;

      // If hex_layer is getting shunted too far off screen, bring it back towards center.
      if(parseFloat(move_x) >= 500 | parseFloat(move_x) <= -500 | parseFloat(move_y) >= 400 | parseFloat(move_y) <= -400){
          move_x = parseFloat(move_x)*0.5 + 'px';
          move_y = parseFloat(move_y)*0.5 + 'px';
          document.getElementById('hex_layer').style.transition = "transform 1s ease-in-out";
          document.getElementById('hex_layer').style.transform = `translateY(${move_y}) translateX(${move_x})`;
          document.getElementById('hex_layer').style.zIndex = 1;
          document.getElementById('hex_layer').style.position = 'relative';
      }

      // Note that transformation that was applied to the hex_layer div at the moment
      // of un-clicking the mouse.
      previous_translate_x = move_x;
      previous_translate_y = move_y;
  });

  // Mouse movement tracking
  document.getElementById('zoom_layer').addEventListener('mousemove', (event) => {

      // PAN HEXAGON MAP SECTION //
      if(mouse_clicked){
        
        // Calculate how much mouse has moved since it was clicked
        mouse_delta_x = event.clientX - initial_mousedown_x;
        mouse_delta_y = event.clientY - initial_mousedown_y;
        
        //move_x = event.clientX - initial_mousedown_x + 'px';
        move_x = mouse_delta_x + previous_mousedown_x;
        //move_y = event.clientY - initial_mousedown_y + 'px';
        move_y = mouse_delta_y + previous_mousedown_y;
        
        // Apply zoom to reduce speed when zoomed in.
        move_x = move_x / current_zoom
        move_y = move_y / current_zoom;
  
        // Add in whatever translateX / translateY was applied in previous 
        // pan events, if any.
        move_x = move_x + parseFloat(previous_translate_x) + 'px';
        move_y = move_y + parseFloat(previous_translate_y) + 'px';
  
        document.getElementById('hex_layer').style.transition = "none";
        document.getElementById('hex_layer').style.transform = `translateY(${move_y}) translateX(${move_x})`;
        document.getElementById('hex_layer').style.zIndex = 1;
        document.getElementById('hex_layer').style.position = 'relative';
      }
  
      // POP UP HEXAGON UNDER MOUSE CURSOR OR RENDER ARNESON CELLS SECTION //
  
      // Check if the target is a "hex" div
      if (event.target && event.target.classList.contains('zoomlayer')) {
  
          // Get mouse position, adjusted for position inside hex_gen_page.
          mouse_x = event.clientX; //- (window.innerWidth - document.getElementById('zoom_layer').offsetWidth);
          mouse_y = event.clientY; //- (window.innerHeight - document.getElementById('zoom_layer').offsetHeight);
  
          // Calculate which div the mouse is hovering over.
          const hexagons = document.getElementsByClassName('hex-center');
  
          // Has a hexagon previously been highlighted, but now is not under the cursor?
          // If so, remove highlight from such hex.
          if(hovered_hexagon != null){
            rect = hovered_hexagon.getBoundingClientRect();
  
            if (mouse_x < rect.left | mouse_x > rect.right | mouse_y < rect.top | mouse_y > rect.bottom){
              hovered_hexagon.classList.remove('hovered');
              hovered_hexagon = null;
            }
          }
  
          for (let i = 0; i < hexagons.length; i++) {
            const div = hexagons[i];
            const rect = div.getBoundingClientRect();
  
            // If the mouse is over hexagon i ...
            if (mouse_x >= rect.left && mouse_x <= rect.right && mouse_y >= rect.top && mouse_y <= rect.bottom) {
              // Is this hexagon newly highlighted?
              if(hovered_hexagon != div){
                // Remove 'hovered' from previously highlighted div
                if(hovered_hexagon != null){
                hovered_hexagon.classList.remove('hovered');
                }
                hovered_hexagon = div;
                // Render Arneson cells if current_zoom is 6 or more.
                if(current_zoom < 6){
                  if(!div.classList.contains('hovered') && current_zoom <= 2){
                    hovered_hexagon.classList.add('hovered');
                  }
                }
                if(current_zoom >= 7){
                  if(document.getElementById(hovered_hexagon.id + '-a_cell_1') == null){
                    console.log('making arneson cells for hexagon ' + hovered_hexagon.id)
                    make_arneson_cells(hovered_hexagon.id);
                  }
                  else if (current_zoom < 6) {
                    clear_arneson_cells();
                  }
                }
                break;
              }
            }
          }
  
          // Move lava background piece to sit behind hovered, floating hexagon.
          lava_background = document.getElementById('lava-gradient-box');
          lava_highlights = document.getElementById('lava_goop');
  
          lava_background.style.top = hovered_hexagon.style.top;
          lava_background.style.left = hovered_hexagon.style.left;
          lava_background.style.width = hovered_hexagon.offsetWidth + 'px';
          lava_background.style.height = hovered_hexagon.offsetHeight + 'px';
  
          lava_highlights.style.top = hovered_hexagon.style.top;
          lava_highlights.style.left = hovered_hexagon.style.left;
          lava_highlights.style.width = hovered_hexagon.offsetWidth + 'px';
          lava_highlights.style.height = hovered_hexagon.offsetHeight + 'px';
      }
  });

  // Add zoom tracking and effects
  let current_zoom = 4; // Farthest out is 1, farthest in could be 10.
  let current_zoom_unbinned = 2;
  let lastKnownScrollPosition = 0;
  // Zoom Levels
  let min_zoom = 1;
  let max_zoom = 20;

  // Add mouse scroll event listener to the 'zoom_layer' div.
  document.getElementById('zoom_layer').addEventListener('wheel', (event) => {
    current_zoom_unbinned = lastKnownScrollPosition - event.deltaY * 0.01;
    lastKnownScrollPosition = current_zoom_unbinned;
    //console.log(`current_zoom_unbinned: ${current_zoom_unbinned}`);

    // ZOOM OUT
    if(current_zoom_unbinned <= -1 && current_zoom > min_zoom) {
      current_zoom = current_zoom - 1;
      current_zoom_unbinned = 0;
      lastKnownScrollPosition = 0;
      //console.log(`current_zoom ${current_zoom}`);
      if(current_zoom < 6){
        console.log("Reverse whoosh!!");
        clear_arneson_cells();
        ///if(document.getElementsByClassName('hex-center').length > 1){ 
        ///  Array.from(document.getElementsByClassName('hex-center')).forEach((hexagon) => {
        ///        //hexagon.classList.remove('hex-faded');
        ///        //hexagon.children[0].classList.remove('hex-invisible');
        ///        document.getElementById('lava-gradient-box').classList.remove('hex-invisible');
        ///        lava_box.style.transition = '2s ease';
        ///      });
        ///    }
        }
      /*
      if(current_zoom < 5){
          current_zoom_transformed = current_zoom;
      } else {
          current_zoom_transformed = current_zoom ** (1.25);
      }
      document.getElementById('hex_gen_page').style.transform = `scale(${current_zoom_transformed})`;
      REPLACED THE ABOVE AND BELOW MATCHING CODE WITH THE SWITCH STATEMENT BELOW */
      
      switch (current_zoom) {
        case 1:
          current_zoom_transformed = 1;
          break;
        case 2:
          current_zoom_transformed = 1.5;
          break;
        case 3:
          current_zoom_transformed = 2.25;
          break;
        case 4:
          current_zoom_transformed = 3.5;
          break;
        case 5:
          current_zoom_transformed = 4.5;
          break;
        case 6:
          current_zoom_transformed = 5.75;
          break;
        case 7:
          current_zoom_transformed = 7.25;
          break;
        case 8:
          current_zoom_transformed = 9;
          break;
        case 9:
          current_zoom_transformed = 11;
          break;
        case 10:
          current_zoom_transformed = 12.75;
          break;
        case 11:
          current_zoom_transformed = 13.75;
          break;
        case 12:
          current_zoom_transformed = 14.5;
          break;
        case 13:
          current_zoom_transformed = 15;
          break;
        case 14:
          current_zoom_transformed = 15.5;
          break;
        case 15:
          current_zoom_transformed = 16;
          break;
      
        default:
          console.log("Not a valid zoom integer");
      } 
      document.getElementById('hex_gen_page').style.transform = `scale(${current_zoom_transformed})`;
      document.getElementById('hex_gen_page').style.transition = 'transform 0.2s ease';   // introduces a bad blur on the transition but looks better
      numRows = number_hex_v.value;
      numCols = number_hex_h.value;
    }

    // ZOOM IN
    if(current_zoom_unbinned >= 1 && current_zoom < max_zoom) {
      current_zoom = current_zoom + 1;
      current_zoom_unbinned = 0;
      lastKnownScrollPosition = 0;
      //console.log(`current_zoom ${current_zoom}`);
      /*
      if(current_zoom < 5){
          current_zoom_transformed = current_zoom;
      } else {
          current_zoom_transformed = current_zoom ** (1.25);
      }
      document.getElementById('hex_gen_page').style.transform = `scale(${current_zoom_transformed})`;
      */
      
      switch (current_zoom) {
        case 1:
          current_zoom_transformed = 1;
          break;
        case 2:
          current_zoom_transformed = 1.5;
          break;
        case 3:
          current_zoom_transformed = 2.25;
          break;
        case 4:
          current_zoom_transformed = 3.5;
          break;
        case 5:
          current_zoom_transformed = 4.5;
          break;
        case 6:
          current_zoom_transformed = 5.75;
          break;
        case 7:
          current_zoom_transformed = 7.25;
          break;
        case 8:
          current_zoom_transformed = 9;
          break;
        case 9:
          current_zoom_transformed = 11;
          break;
        case 10:
          current_zoom_transformed = 12.75;
          break;
        case 11:
          current_zoom_transformed = 13.75;
          break;
        case 12:
          current_zoom_transformed = 14.5;
          break;
        case 13:
          current_zoom_transformed = 15;
          break;
        case 14:
          current_zoom_transformed = 15.5;
          break;
        case 15:
          current_zoom_transformed = 16;
          break;
      
        default:
          console.log("Not a valid zoom integer");
      }
      document.getElementById('hex_gen_page').style.transform = `scale(${current_zoom_transformed})`;
      document.getElementById('hex_gen_page').style.transition = 'transform 0.2s ease'; 
      
      // Check for whoosh
      if(current_zoom >= 6){
        console.log('whoosh!');
        if(document.getElementsByClassName('hex-center').length > 1){ 
          Array.from(document.getElementsByClassName('hex-center')).forEach((hexagon) => {
              //hexagon.classList.add('hex-faded');
              //hexagon.children[0].classList.add('hex-invisible');
              lava_box = document.getElementById('lava-gradient-box');
              lava_box.style.transition = 'none';
              lava_box.classList.add('hex-invisible');
            });
        }
      }
      numRows = number_hex_v.value;
      numCols = number_hex_h.value;
    }

    // If current zoom unbinned is getting ridiculously negative or positive, set back to 0.
    if(current_zoom_unbinned < -2.5 | current_zoom_unbinned > 2.5){
      current_zoom_unbinned = 0;
      lastKnownScrollPosition = 0;
    }

    // If already at most zoomed out possible, don't allow negative zoom values to build up.
    if(current_zoom == 1 & current_zoom_unbinned < 0) {
      current_zoom_unbinned = 0;
      lastKnownScrollPosition = 0;
    }

    event.preventDefault();
  });
}