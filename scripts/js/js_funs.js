//function read_in_terrain_data(){
//    var m_geo_stock = {
//        'goop': [0]
//    };
//    var number_of_geomorphs = 0; 
//    var cols_in_geomorph = 0; 
//    var first_col_name = 0;
//    var number_rows_in_geomorph = 0;
//
//    // Call the read_json function and update m_geo_stock when the promise resolves
//    read_json('./data/geomorphs/mountain.json')
//        .then(content => {
//        // Assign the content to your object
//        m_geo_stock = content;
//        console.log(m_geo_stock); // Check the updated object
//        console.log(Object.keys(m_geo_stock));
//        console.log(Object.keys(m_geo_stock).length);
//        // How many JSON dictionaries are in our m_geo_stock?
//        number_of_geomorphs = Object.keys(m_geo_stock).length;
//
//        // How many columns are in any of these? What are they?
//        cols_in_geomorph = Object.keys(m_geo_stock.mountain);
//        number_cols_in_geomorph = cols_in_geomorph.length;
//        first_col_name = Object.keys(m_geo_stock.mountain)[0];
//        number_rows_in_geomorph = m_geo_stock.mountain[first_col_name].length;
//        });
//}

function render_hexagons(numCols, numRows, container_height, container_width) {
    //let max_y = window.innerHeight;
    //let max_x = max_y;

    let max_y = container_height;
    let max_x = container_width;

    console.log('max_y is ' + max_y);
    console.log('max_x is ' + max_x);

    // Find which of height and width are smaller; use that.
    if(max_y > max_x) {
        max_y = max_x;
    } else {
        max_x = max_y;
    }

    console.log('max_y is ' + max_y);
    console.log('max_x is ' + max_x);

    // Reverse-buffer the screen dimensions; makes sure no hex is placed right at screen edge.
    max_x = 0.95 * max_x;
    max_y = 0.95 * max_y;

    hexagon_size_x = max_x / numCols; //* hex_proportionality_const;
    hexagon_size_y = max_y / numRows; //* hex_proportionality_const; // to maintain hex proportions

    if(hexagon_size_x > hexagon_size_y){
        hexagon_size_y = hexagon_size_x
    } else {
        hexagon_size_x = hexagon_size_y
    }

    // For each row...
    for (let xCoord = 1; xCoord <= numCols; xCoord++) {
    // Fill out column with hexagons
        for (let yCoord = 1; yCoord <= numRows; yCoord++) {
            // Calculate a unique ID
            const uniqueID = (numRows) * (xCoord - 1) + yCoord;
            // Grab corresponding hexagon.
            hex_for_mods = document.getElementById('hex_' + uniqueID);

            hex_for_mods.style.visibility = 'hidden';
            hex_for_mods.style.width = hexagon_size_x + 'px';
            hex_for_mods.style.height = hexagon_size_y + 'px';

            //hex_for_mods.style.zIndex = yCoord * 2;
            // Every odd row.
            if(xCoord % 2 == 1){
                hex_for_mods.style.zIndex = yCoord * 2;
            }
            // Every even row.
            if(xCoord % 2 == 0){
                hex_for_mods.style.zIndex = (yCoord) * 2 + 1;
            }

            hex_for_mods.style.left = xCoord * hexagon_size_x - hexagon_size_x*0.268*xCoord + 'px';
            // If this is an even row (2, 4, 6, etc.),
            // apply a vertical offset of half the hex width.
            if(xCoord % 2 === 0) {
                hex_for_mods.style.top = (yCoord + 0.425) * hexagon_size_y - (yCoord)*hexagon_size_y*0.156 - hexagon_size_y*0.5 + 'px';
            } else {
                hex_for_mods.style.top = (yCoord) * hexagon_size_y - (yCoord)*hexagon_size_y*0.156 - hexagon_size_y*0.5 + 'px';
            }

            hex_label = document.getElementById('hex_label_' + uniqueID);
            hex_label.style.zIndex = hex_for_mods.style.zIndex + 1;
        }
    }
}

//function ripple_hexes_in_col_up(numCols,numRows){
//    for(let z = 1; z <= numRows; z++) {   //  your code here
//        const uniqueID = (numRows * (numCols - 1)) + z;
//        hex_for_ripple = document.getElementById('hex_' + uniqueID);
//        hex_for_ripple.style.visibility = 'visible';
//        hex_for_ripple.style.transform = 'translateY(-15%)';
//    }
//}
//
//function ripple_hexes_in_col_down(numCols,numRows){
//    for(let z = 1; z <= numRows; z++) {   //  your code here
//        const uniqueID = (numRows * (numCols - 1)) + z;
//        hex_for_ripple = document.getElementById('hex_' + uniqueID);
//        hex_for_ripple.style.visibility = 'visible';
//        hex_for_ripple.style.transform = 'translateY(+15%)';
//    }
//}
//
//function ripple(numCols,numRows) {
//    
//    var i = 1;
//
//    function myLoop() { 
//
//        ripple_hexes_in_col_up(i,numRows);
//        
//        setTimeout(function() {
//            ripple_hexes_in_col_down(i,numRows);
//            i++;                    //  increment the counter
//            if (i <= numCols) {           //  if the counter < 10, call the loop function
//            myLoop();             //  ..  again which will trigger another 
//            }    
//        }, 100)
//    }
//    myLoop();
//}

//function add_mouse_effects(number_of_hexes){
//
//    tile_click_audio = document.getElementById('tile-click-noise');
//
//    for (let i = 1; i <= number_of_hexes; i++) {
//        the_hex_label = document.getElementById('hex_label_' + i);
//        //the_hex = document.getElementById('hex_' + i);
//        all_hexes = document.getElementsByClassName('hex-center');
//
//        // Select hex by clicking
//        the_hex_label.addEventListener('click', function() {
//            //the_hex.classList.add('highlighted');
//            if(document.getElementsByClassName('highlighted').length >= 1){
//                hexes_to_unhighlight = document.getElementsByClassName('highlighted');
//                h_as_array = Array.from(hexes_to_unhighlight);
//                for (let z = 0; z < h_as_array.length; z++) {
//                    h_as_array[z].classList.toggle('highlighted');
//                }
//            }
//            //hex_to_remove = document.getElementsByClassName('highlighted')
//            
//            //console.log(hex_to_remove.id)
//            //classList.remove('highlighted');
//            all_hexes[i - 1].classList.toggle('highlighted');
//
//            //setTimeout(function() {
//            //    the_hex.classList.remove("highlighted");
//            //}, 1000);
//        })
//
//        the_hex_label.addEventListener('mouseenter', function() {
//       //     the_hex.classList.add('highlighted');
//                //the_hex.classList.toggle('highlighted');
//                tile_click_audio.play();
//        })
//
//        //the_hex.addEventListener('mouseleave', function() {
//        //    the_hex.classList.remove("highlighted");
//        //})
//    }
//}