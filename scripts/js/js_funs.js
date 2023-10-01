// Make an array from two numbers (e.g. range(2,5) gives an array 2,3,4,5)
function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function read_json(fileName) {
   return fetch(fileName) // Fetch the file using a relative path
     .then(response => response.json()) // Parse the JSON response
    .catch(error => {
        console.error('Error reading the JSON file:', error);
    });
}

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
        hex_label.id = 'hex_label_' + i;
        hex_label.className = 'hex-label';
        hex_label.textContent = 'Hex ' + i;
        hex_label.style.paddingTop = '60%';

        hexagon.appendChild(hex_label);

        // Append the hexagon div to the document body or another container
        document.body.appendChild(hexagon);
    }
}

function read_in_terrain_data(){
    var m_geo_stock = {
        'goop': [0]
    };
    var number_of_geomorphs = 0; 
    var cols_in_geomorph = 0; 
    var first_col_name = 0;
    var number_rows_in_geomorph = 0;

    // Call the read_json function and update m_geo_stock when the promise resolves
    read_json('./data/geomorphs/mountain.json')
        .then(content => {
        // Assign the content to your object
        m_geo_stock = content;
        console.log(m_geo_stock); // Check the updated object
        console.log(Object.keys(m_geo_stock));
        console.log(Object.keys(m_geo_stock).length);
        // How many JSON dictionaries are in our m_geo_stock?
        number_of_geomorphs = Object.keys(m_geo_stock).length;

        // How many columns are in any of these? What are they?
        cols_in_geomorph = Object.keys(m_geo_stock.mountain);
        number_cols_in_geomorph = cols_in_geomorph.length;
        first_col_name = Object.keys(m_geo_stock.mountain)[0];
        number_rows_in_geomorph = m_geo_stock.mountain[first_col_name].length;
        });
}

function select_terrain_type(numCols, numRows){

    var m_geo_stock = {
        'goop': [0]
    };
    var number_of_geomorphs = 0; 
    var cols_in_geomorph = 0; 
    var first_col_name = 0;
    var number_rows_in_geomorph = 0;

    // Call the read_json function and update m_geo_stock when the promise resolves
    read_json('./data/geomorphs/mountain.json')
        .then(content => {
        // Assign the content to your object
        m_geo_stock = content;
        console.log(m_geo_stock); // Check the updated object
        console.log(Object.keys(m_geo_stock));
        console.log(Object.keys(m_geo_stock).length);
        // How many JSON dictionaries are in our m_geo_stock?
        list_of_geomorphs = Object.keys(m_geo_stock);
        number_of_geomorphs = list_of_geomorphs.length;
        
        // How many columns are in any of these? What are they?
        cols_in_geomorph = Object.keys(m_geo_stock.mountain);
        number_cols_in_geomorph = cols_in_geomorph.length;
        first_col_name = Object.keys(m_geo_stock.mountain)[0];
        number_rows_in_geomorph = m_geo_stock.mountain[first_col_name].length;

        //console.log("I'm in the select terrain function" + m_geo_stock);
        // For each morph in our m_geo_stock object...
        //for (let morph = 0; morph < number_of_geomorphs; morph++) {

        proportion_mountains = 0.1; // This could be a user input later on.
        num_hexes_of_this_morph = 0;
        total_num_hexes = document.getElementsByClassName('hex-center').length;
        prop_hexes_of_this_morph = 0;

        for (let morph = 0; morph < number_of_geomorphs; morph++) {

            morph_name = list_of_geomorphs[morph];

            for(let i = 0; prop_hexes_of_this_morph <= proportion_mountains; i++) {

                number_mountains = document.getElementsByClassName(morph_name).length;
                prop_hexes_of_this_morph = number_mountains / total_num_hexes;

                if(prop_hexes_of_this_morph <= proportion_mountains) {

            // Apply mountain geo semi-randomly
            // Limit viability of rows and cols so that geomorph never runs off entire map?
            //viableCols = range()

            r_col_to_start = Math.floor(Math.random() * (numCols - number_cols_in_geomorph)) + 1;
            r_row_to_start = Math.floor(Math.random() * (numRows - number_rows_in_geomorph)) + 1;
            // We subtract the number of rows + cols from our geomorph so that the placement
            // always lands inside our hex map.

            // These inform the top left corner of our geomorph's placement.

            directions = ['horizontal','vertical'];
            let direction = 'unknown';
            direction = directions[Math.floor(Math.random() * directions.length)];
            console.log("direction is " + direction);
            // Calculate hex ID for this iteration of the loop.
            if(direction == 'vertical'){
                // These loops' start and end integers are relative to the dimensions of the geomorph file.
                for (let col_number = 1; col_number <= number_cols_in_geomorph; col_number++) {
                    for (let row_number = 1; row_number < number_rows_in_geomorph; row_number++) {

                        // Increase col and row number in each loop by the random start determined above.
                        col_num_hex = col_number + r_col_to_start;
                        row_num_hex = row_number + r_row_to_start;

                        uniqueID = (numRows) * (col_num_hex - 1) + row_num_hex;

                        //console.log('col_number currently = ' + col_num_hex);
                        //console.log('row_number currently = ' + row_num_hex);
                        //console.log('Testing hex ' + uniqueID);

                        // Pull out this hexagon.
                        hex_to_mod = document.getElementById('hex_' + uniqueID);

                        //console.log(m_geo_stock);
                        //console.log('morph name is ' + morph_name);
                        //console.log(m_geo_stock[morph_name]['col_' + col_number]);
                        //console.log("column " + col_num_hex + "and row " + row_num_hex);
                        // Assign whatever value that cell of the geomorph matrix has!
                        if(m_geo_stock[morph_name]['col_' + col_number][row_number] === 1){
                            // Assign this type of geometry
                            hex_to_mod.classList.add(morph_name)
                            console.log(hex_to_mod.id + ' is now a ' + morph_name + '!')
                        } else {
                            //hex_to_mod.classList.add('mountain')
                        }
                    }
                }
            }
            if(direction == 'horizontal') {
                for (let col_number = 1; col_number <= number_cols_in_geomorph; col_number++) {
                    for (let row_number = 1; row_number < number_rows_in_geomorph; row_number++) {

                        // Increase col and row number in each loop by the random start determined above.
                        col_num_hex = col_number + r_col_to_start;
                        row_num_hex = row_number + r_row_to_start;

                        uniqueID = (numRows) * (row_num_hex - 1) + col_num_hex;

                        // Pull out this hexagon.
                        hex_to_mod = document.getElementById('hex_' + uniqueID);

                        if(m_geo_stock[morph_name]['col_' + col_number][row_number] === 1){
                            // Assign this type of geometry
                            hex_to_mod.classList.add(morph_name)
                            console.log(hex_to_mod.id + ' is now a ' + morph_name + '!')
                        }
                    }
                }
            }
            if(direction == 'diagonal') {
                for (let col_number = 1; col_number <= number_cols_in_geomorph; col_number++) {
                    for (let row_number = 1; row_number < number_rows_in_geomorph; row_number++) {

                        // Increase col and row number in each loop by the random start determined above.
                        //col_num_hex = col_number + r_col_to_start;
                        col_num_hex = (col_number - 1) + r_col_to_start;
                        row_num_hex = (row_number - 1) + r_row_to_start;

                        //Each round of loop, row_number increases by one; we need to add 
                        //these row_number integers to the col_num_hex variable.
                        col_num_hex_with_row_added = (col_num_hex + row_number - 1);

                        if(col_num_hex_with_row_added % 2 === 1 | col_number === 1){
                            diagonal_bump = 0;
                        } else {
                            diagonal_bump = 1;
                        }
                        console.log(col_num_hex_with_row_added);

                        uniqueID = (numRows) * (col_num_hex_with_row_added - 1) - diagonal_bump;

                        // Pull out this hexagon.
                        hex_to_mod = document.getElementById('hex_' + uniqueID);

                        if(m_geo_stock[morph_name]['col_' + col_number][row_number] === 1){
                            // Assign this type of geometry
                            hex_to_mod.classList.add(morph_name)
                            console.log(hex_to_mod.id + ' is now a ' + morph_name + '!')
                        }
                    }
                }
            }
        }
        number_mountains = document.getElementsByClassName(morph_name).length;
            prop_hexes_of_this_morph = number_mountains / total_num_hexes;
            console.log(number_mountains);
            console.log(total_num_hexes);
            console.log(prop_hexes_of_this_morph);
    }
        }
    });
}

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

function ripple_hexes_in_col_up(numCols,numRows){
    for(let z = 1; z <= numRows; z++) {   //  your code here
        const uniqueID = (numRows * (numCols - 1)) + z;
        hex_for_ripple = document.getElementById('hex_' + uniqueID);
        hex_for_ripple.style.visibility = 'visible';
        hex_for_ripple.style.transform = 'translateY(-15%)';
    }
}

function ripple_hexes_in_col_down(numCols,numRows){
    for(let z = 1; z <= numRows; z++) {   //  your code here
        const uniqueID = (numRows * (numCols - 1)) + z;
        hex_for_ripple = document.getElementById('hex_' + uniqueID);
        hex_for_ripple.style.visibility = 'visible';
        hex_for_ripple.style.transform = 'translateY(+15%)';
    }
}

function ripple(numCols,numRows) {
    
    var i = 1;

    function myLoop() { 

        ripple_hexes_in_col_up(i,numRows);
        
        setTimeout(function() {
            ripple_hexes_in_col_down(i,numRows);
            i++;                    //  increment the counter
            if (i <= numCols) {           //  if the counter < 10, call the loop function
            myLoop();             //  ..  again which will trigger another 
            }    
        }, 100)
    }
    myLoop();
}

//for(let i = 1; i <= numCols; i++){
//// Row by row, find all hex ids of hexagons to ripple
//(async function ripple_timer(i) {
//ripple_column(i,numRows);
//await timer(3000);
//// Wait 0.1 of a second.
//}
//)(i);
//}
//}


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

function remove_old_hexes() {
    old_hexes = Array.from(document.getElementsByClassName('hex-center'));
    for (let i = old_hexes.length; i > 0; i--) {
        hex_for_removal = document.getElementById('hex_' + i);
        hex_label_for_removal = document.getElementById('hex_label_' + i);
        hex_for_removal.remove();
        hex_label_for_removal.remove();
    }
}