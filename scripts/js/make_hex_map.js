function make_hex_map(numRows, numCols, container_height, container_width, make_clouds) {
    numRows = number_hex_v.value;
    numCols = number_hex_h.value;
    container_height = document.getElementById('hex_gen_page').offsetHeight;
    container_width = document.getElementById('hex_gen_page').offsetWidth;

    number_of_hexes = numRows * numCols
    const terrain_types = ['open','wooded','mountain','swamp','desert']; // Terrain types!
    
    //remove_old_hexes
    if(document.getElementsByClassName('hex-center').length > 1){
        old_hexes = Array.from(document.getElementsByClassName('hex-center'));
        for (let i = old_hexes.length; i > 0; i--) {
            hex_for_removal = document.getElementById('hex_' + i)
            hex_label_for_removal = document.getElementById('hex_label_' + i)
            hex_for_removal.remove();
            hex_label_for_removal.remove();
        }
    }

    
    // Create hexagons based on number requested.
    initialize_hexagons(number_of_hexes);
    // Adjust hexagon positioning etc. based on initial window size.
    //render_hexagons(numCols, numRows, window.innerWidth);
    render_hexagons(numCols, numRows, container_height, container_width);
    // Add mouseover effects to hexagons
    //add_mouse_effects(number_of_hexes);
    // Ripple
    ripple(numCols,numRows);

    if(make_clouds == true){
    create_clouds(container_height);
    }
};

function make_hex_map_from_loaded_data(loaded_data, container_height, container_width, make_clouds) {
    // Load in each 'column' from the data file.
    unique_ids = loaded_data.unique_ids;
    class_names = loaded_data.class_names;
    numRows = loaded_data.numRows;
    numCols = loaded_data.numCols;
    number_of_hexes = loaded_data.number_of_hexes;
    //mountain_hexes = loaded_data.mountain_hexes;
    // Detect some parameters from the page size.
    container_height = document.getElementById('hex_gen_page').offsetHeight;
    container_width = document.getElementById('hex_gen_page').offsetWidth;

    // Update the user inputs for number of hexagons vertically and horizontally
    document.getElementById('number_hex_h').value = numCols;
    document.getElementById('number_hex_v').value = numRows;

    const terrain_types = ['open','wooded','mountain','swamp','desert']; // Terrain types!
    
    //Remove current hexagons on page, if any.
    if(document.getElementsByClassName('hex-center').length > 1){
        old_hexes = Array.from(document.getElementsByClassName('hex-center'));
        for (let i = old_hexes.length; i > 0; i--) {
            hex_for_removal = document.getElementById('hex_' + i)
            hex_label_for_removal = document.getElementById('hex_label_' + i)
            hex_for_removal.remove();
            hex_label_for_removal.remove();
        }
    }
    // Remove current lavabox?
    if(document.getElementsByClassName('lava-background').length == 1){
        document.getElementById('lava-gradient-box').remove();
    } // Not currently working! Ugh.

    // Create hexagons based on number requested.
    initialize_hexagons(number_of_hexes);
    // Adjust hexagon positioning etc. based on initial window size.
    //render_hexagons(numCols, numRows, window.innerWidth);
    render_hexagons(numCols, numRows, container_height, container_width);
    // Add mouseover effects to hexagons
    //add_mouse_effects(number_of_hexes);
    // Add ripple effect.
    ripple(numCols,numRows);

    if(make_clouds == true){
        create_clouds(container_height);
    }

    // Set default terrain type.
    default_terrain = 'open';

    // Add class types from data file to hexagons.
    for(let i = 1; i <= number_of_hexes; i++) {
        // Is this hexagon present in the loaded data?
        if(unique_ids.includes('hex_' + i)){
            // If yes, add its class names.
            class_to_add = class_names[unique_ids.indexOf('hex_' + i)];
            document.getElementById('hex_' + i).classList.add(class_to_add);
        } else {
            // If no, add 'open'
            document.getElementById('hex_' + i).classList.add(default_terrain);
        }
    }
};