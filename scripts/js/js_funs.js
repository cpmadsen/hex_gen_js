function initialize_hexagons(number_of_hexes) {
    for (let i = 1; i <= number_of_hexes; i++) {
        // Create a new box element for each hexagon
        const hexagon = document.createElement('div');
        hexagon.className = 'hex-center'; // You can add a CSS class for styling
        //hexagon.id = 'hex_' + data[i].uniqueID
        hexagon.id = 'hex_' + i
        hexagon.style.width = '100px';
        //hexagon.style.height = 100 * hex_proportionality_const + 'px';
        hexagon.style.height = '100px';
        //hexagon.style.borderRadius = '50%'; /* Make it round */
        hexagon.style.position = 'absolute';
        
        // LABEL FOR HEX
        hex_label = document.createElement('div');
        //hex_label.id = 'hex_label_' + (i + 1);
        hex_label.id = 'hex_label_' + i;
        hex_label.className = 'hex-label';
        //hex_label.style.zIndex = 10;
        //hex_label.textContent = 'Hex ' + (i + 1);
        hex_label.textContent = 'Hex ' + i;

        hexagon.appendChild(hex_label);

        // Append the hexagon div to the document body or another container
        document.body.appendChild(hexagon);
    }
}

function select_terrain_type(number_of_hexes, terrain_types){
    for (let i = 1; i <= number_of_hexes; i++) {
        the_hex = document.getElementById('hex_' + i);

        // randomly determine terrain_type.
        terrain_type_class = terrain_types[Math.floor(Math.random() * terrain_types.length)];
        the_hex.style.backgroundPosition = 'center';
        the_hex.style.backgroundRepeat = 'no-repeat';
    }
}

function render_hexagons(numCols, numRows, max_dimension) {
    //let max_y = window.innerHeight;
    //let max_x = max_y;

    let max_y = max_dimension;
    let max_x = max_dimension;

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

function add_mouse_effects(number_of_hexes){

    tile_click_audio = document.getElementById('tile-click-noise');

    for (let i = 1; i <= number_of_hexes; i++) {
        the_hex_label = document.getElementById('hex_label_' + i);
        //the_hex = document.getElementById('hex_' + i);
        all_hexes = document.getElementsByClassName('hex-center');

        // Select hex by clicking
        the_hex_label.addEventListener('click', function() {
            //the_hex.classList.add('highlighted');
            if(document.getElementsByClassName('highlighted').length >= 1){
                hexes_to_unhighlight = document.getElementsByClassName('highlighted');
                h_as_array = Array.from(hexes_to_unhighlight);
                for (let z = 0; z < h_as_array.length; z++) {
                    h_as_array[z].classList.toggle('highlighted');
                }
            }
            //hex_to_remove = document.getElementsByClassName('highlighted')
            
            //console.log(hex_to_remove.id)
            //classList.remove('highlighted');
            all_hexes[i - 1].classList.toggle('highlighted');

            //setTimeout(function() {
            //    the_hex.classList.remove("highlighted");
            //}, 1000);
        })

        the_hex_label.addEventListener('mouseenter', function() {
       //     the_hex.classList.add('highlighted');
                //the_hex.classList.toggle('highlighted');
                tile_click_audio.play();
        })

        //the_hex.addEventListener('mouseleave', function() {
        //    the_hex.classList.remove("highlighted");
        //})
    }
}