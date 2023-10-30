hexagon_map_container.addEventListener("click", function (event) {
      // The following conditions must be met:
      // There is a target.
      // The target is a div
      // The target is NOT the hex_gen_page itself.
      // The target has more than just one class, i.e. is not a vanilla, terrain-less hexagon.
      if (event.target && event.target.tagName === "DIV" && event.target.id != 'hex_gen_page' && event.target.parentNode.classList.length > 1) {
          
        const clicked_hex_id = event.target.parentNode.id;
        const clicked_hex_id_number = parseInt(clicked_hex_id.replace('hex_',''));
        all_hexes = document.getElementsByClassName('hex-center');
        all_hexagon_ids = Array.from(all_hexes).map(el => el.id);
        console.log("Clicked hexagon : " + clicked_hex_id);
          
        hex_to_zoom = document.getElementById(clicked_hex_id);
        // Get list of nearest 2 neighbours in all directions.
        all_neighbours = Array();
        
        // Nested map function:
        // 1. Find adjacent neighbours of clicked hex.
        // 2. Find neighbours of those neighbours, adding them to 'all_neighbours' array.
        find_adjacent(clicked_hex_id_number).forEach((el) => {
          find_adjacent(parseInt(el.id.replace('hex_',''))).forEach((el) => {
              all_neighbours.push(el.id)
          });
        });
        // 3. Simplify array by dropping duplicates.
        all_neighbours = all_neighbours.filter((v, i) => all_neighbours.indexOf(v) === i);
        
        // 4. Pull out hex ID numbers (i.e. drop the text), sort in ascending order.
        all_neighbours = all_neighbours.map(e => e.replace('hex_','')).sort()

        console.log(all_neighbours);

        // 5. Pull out the terrain types of the hexagons and apply them to hex petals in hexagon flower.
        for (i = 1; i <= all_neighbours.length; i++){
          terrain_type_to_add = document.getElementById('hex_' + all_neighbours[i-1]).classList.value.replace('hex-center ','');
          console.log('will add ' + terrain_type_to_add + ' to hex flower ' + i);
          document.getElementById('hex_flower_' + i).classList.add('vector_' + terrain_type_to_add)
        }
        
        // Make all hexagons from the hexagon map, and the lavabox, invisible.
        for(i = 1; i <= all_hexagon_ids.length; i++) {
            document.getElementById('hex_' + i).classList.add('hex-invisible');
          };
        document.getElementById('lava-gradient-box').classList.add('hex-invisible');
        
        // And make the hexagon flower visible.
        for(i = 1; i <= all_neighbours.length; i++) {
          document.getElementById('hex_flower_' + i).classList.remove('hex-invisible');
        }
          //// Make clicked hex big, all others invisible.
          //hex_to_zoom.classList.add('hex-selected');
          //hex_to_zoom.firstChild.classList.add('hex-invisible');
         //// Adjust neighbour hex CSS
          //for( i = 0; i < hex_to_zoom_neighbours.length; i++) {
          //  hex_to_zoom_neighbours[i].classList.add('hex-selected-neighbour')
          //}
          //// Adjust the rest of the hexagons' CSS, rendering them invisible.
          //for(i = 1; i <= all_hexagon_ids.length; i++) {
          //  if('hex_' + i != clicked_hex_id && Array.from(neighbour_ids).includes('hex_' + i)){
          //    if('hex_' + i)
          //    document.getElementById('hex_' + i).classList.add('hex-invisible');
          //  }
          //}
      }
    });